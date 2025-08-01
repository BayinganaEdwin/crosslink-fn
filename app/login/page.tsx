'use client';

import { useState } from 'react';
import { EyeIcon, EyeOffIcon, Loader } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { redirect } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '@/store/actions/auth';
import { setToken } from '@/store/reducers/app';
import { TOKEN_NAME, USER_DATA } from '@/utils/constants';
import toast, { LoaderIcon } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function Page() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const togglePassword = () => setShowPassword(!showPassword);
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
  }>({});
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSignupRedirect = () => {
    redirect('/signup');
  };

  const validateForm = (formData: FormData) => {
    const newErrors: typeof errors = {};

    const email = formData.get('email') as string;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    const password = formData.get('password') as string;
    if (!password || password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formErrors = validateForm(formData);

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setErrors({});
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const payload = {
      email,
      password,
    };

    try {
      const res = await login(payload).unwrap();
      const { user, token } = res;

      dispatch(setToken(token));
      // Sets the cookie to expire in 7 days
      document.cookie = `${TOKEN_NAME}=${token}; path=/; max-age=${
        60 * 60 * 24 * 7
      }`;
      localStorage.setItem(TOKEN_NAME, token);
      localStorage.setItem(USER_DATA, JSON.stringify(user));
      toast.success('Login successful!', {
        id: 'global_success_msg',
      });
      router.push('/dashboard');
    } catch (error) {
      return;
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Login to your account
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form id="login-form" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  defaultValue="edwin@example.com"
                  required
                  className={errors.email ? 'border-destructive' : ''}
                />
                {errors.email && (
                  <span className="text-sm text-destructive">
                    {errors.email}
                  </span>
                )}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="********"
                    defaultValue="Password@123"
                    className={errors.password ? 'border-destructive' : ''}
                  />
                  <button
                    type="button"
                    onClick={togglePassword}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    {showPassword ? (
                      <EyeOffIcon className="h-4 w-4" />
                    ) : (
                      <EyeIcon className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <span className="text-sm text-destructive">
                    {errors.password}
                  </span>
                )}
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button
            type="submit"
            className="w-full"
            form="login-form"
            disabled={isLoading}
          >
            {isLoading ? <LoaderIcon /> : 'Login'}
          </Button>
          <CardAction
            onClick={handleSignupRedirect}
            className="flex self-center cursor-pointer"
          >
            <Button variant="link">Don&apos;t have an account? Sign Up</Button>
          </CardAction>
        </CardFooter>
      </Card>
    </div>
  );
}
