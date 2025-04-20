'use client';

import { useState } from 'react';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Card } from '../../../components/ui/card';
import { Label } from '../../../components/ui/label';
import { Briefcase } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '../../../hooks/use-toast';
import { register, rollback } from '../../../api/authApi/authApi';
import { withGuest } from '../../../components/withAuth';
import { addProfile } from '../../../api/userApi/userApi';
import { useAuth } from '../../../context/AuthContext';
import { AuthResponse, RegisterRequest, User } from '../../types';

function SignUpPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { login, logout } = useAuth();

  const createUser = async (response: AuthResponse) : Promise<{success: boolean, userData?: any}> => {
    try {
      const user = {
        fullName: response?.fullName,
        email: response?.email,
        phone: response?.phone,
      }

      const userData = await addProfile(user);
      toast({
        title: 'Success',
        description: "User added successfully !", 
        variant: 'default',
      });
      return { success: true, userData };
    }catch(error:any){
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
      return { success: false };
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
          const request : RegisterRequest = {fullName, email, password, confirmPassword, phone: phoneNumber}
          const response = await register(request);
          toast({
            title: 'Success',
            description: 'Successfully registered !',
          });

          const { success, userData } = await createUser(response);
          if(success && userData){
            login(response.token, {
              id: userData.id,
              fullName: userData.fullName,
              email: userData.email,
              phone: userData.phone
            });
          }else{
            await rollback();
            logout();
          }
          
    } catch (error : any) {
          toast({
            title: 'Error',
            description: error.message,
            variant: 'destructive',
          });
    } finally {
          setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md p-8">
        <div className="flex flex-col items-center space-y-6">
          <div className="flex items-center space-x-2">
            <Briefcase className="h-6 w-6" />
            <span className="text-2xl font-bold">Job Tracker</span>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
          <p className="text-sm text-muted-foreground">
            Enter your details to create your account
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              placeholder="John Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          
          <Button type="submit" className="w-full">
            Create Account
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          Already have an account?{' '}
          <Link href="/login" className="text-primary hover:underline">
            Sign in
          </Link>
        </div>
      </Card>
    </div>
  );
}

export default withGuest(SignUpPage);