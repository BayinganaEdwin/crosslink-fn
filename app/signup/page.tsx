'use client';

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
import { useState } from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { useSignupMutation } from '@/store/actions/auth';
import toast, { LoaderIcon } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function Page() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const togglePassword = () => setShowPassword(!showPassword);
  const toggleConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);
  const [signup, { isLoading }] = useSignupMutation();
  const router = useRouter();

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const handleLoginRedirect = () => {
    router.push('/login');
  };

  const validateForm = (formData: FormData) => {
    const newErrors: typeof errors = {};

    const name = formData.get('name') as string;
    if (!name || name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    const email = formData.get('email') as string;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    const password = formData.get('password') as string;
    if (!password || password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    const confirmPassword = formData.get('confirm-password') as string;
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
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

    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const role = formData.get('role') as string;

    const payload = {
      name,
      email,
      password,
      role,
    };

    try {
      await signup(payload).unwrap();
      toast.success('Signup successful!', {
        id: 'global_success_msg',
      });
      router.push('/login');
    } catch (error) {
      return;
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader className="flex justify-center">
          <CardTitle className="text-2xl font-bold">
            Create an account
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form id="signup-form" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  required
                  className={errors.name ? 'border-destructive' : ''}
                />
                {errors.name && (
                  <span className="text-sm text-destructive">
                    {errors.name}
                  </span>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="email@example.com"
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
                <Label htmlFor="role">Role</Label>
                <select
                  id="role"
                  name="role"
                  required
                  className="input border rounded px-3 py-2 text-sm"
                  defaultValue="student"
                >
                  <option value="" disabled>
                    Select your role
                  </option>
                  <option value="student">Student</option>
                  <option value="employer">Employer</option>
                  <option value="school">School Admin</option>
                </select>
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

              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                </div>
                <div className="relative">
                  <Input
                    id="confirm-password"
                    name="confirm-password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    placeholder="********"
                    className={
                      errors.confirmPassword ? 'border-destructive' : ''
                    }
                  />
                  <button
                    type="button"
                    onClick={toggleConfirmPassword}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    {showConfirmPassword ? (
                      <EyeOffIcon className="h-4 w-4" />
                    ) : (
                      <EyeIcon className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <span className="text-sm text-destructive">
                    {errors.confirmPassword}
                  </span>
                )}
              </div>
            </div>
          </form>
        </CardContent>
        <CardAction onClick={handleLoginRedirect} className="flex self-center">
          <Button variant="link">Already have an account? Log in</Button>
        </CardAction>
        <CardFooter className="flex-col gap-2">
          <Button
            type="submit"
            className="w-full"
            form="signup-form"
            disabled={isLoading}
          >
            {isLoading ? <LoaderIcon /> : 'Create account'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
