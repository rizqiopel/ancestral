import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Login() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>('login');
  const [loginEmail, setLoginEmail] = useState<string>('');
  const [loginPassword, setLoginPassword] = useState<string>('');
  const [registerName, setRegisterName] = useState<string>('');
  const [registerEmail, setRegisterEmail] = useState<string>('');
  const [registerPassword, setRegisterPassword] = useState<string>('');
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would authenticate with a backend server
    // For now, we'll just simulate a successful login
    console.log('Logging in with:', { email: loginEmail, password: loginPassword });
    localStorage.setItem('isAuthenticated', 'true');
    navigate('/');
  };
  
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would register the user with a backend server
    // For now, we'll just simulate a successful registration
    console.log('Registering with:', { name: registerName, email: registerEmail, password: registerPassword });
    localStorage.setItem('isAuthenticated', 'true');
    navigate('/');
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-family-parchment p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-playfair font-bold text-family-brown">Ancestral Roots</h1>
          <p className="font-lato text-family-charcoal mt-1">Connect with your family heritage</p>
        </div>
        
        <Card className="border-family-cream shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl font-playfair text-center text-family-brown">Welcome</CardTitle>
            <CardDescription className="text-center font-lato">
              Sign in to access your family tree
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-2 mb-6">
                <TabsTrigger value="login" className="font-lato">Login</TabsTrigger>
                <TabsTrigger value="register" className="font-lato">Register</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <form onSubmit={handleLogin}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="font-playfair text-family-brown">Email</Label>
                      <Input 
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        required
                        className="font-lato"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password" className="font-playfair text-family-brown">Password</Label>
                        <a href="#" className="text-sm font-lato text-family-green hover:underline">
                          Forgot password?
                        </a>
                      </div>
                      <Input 
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        required
                        className="font-lato"
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-family-brown hover:bg-family-brown/90 text-white font-lato"
                    >
                      Sign In
                    </Button>
                  </div>
                </form>
              </TabsContent>
              
              <TabsContent value="register">
                <form onSubmit={handleRegister}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="font-playfair text-family-brown">Full Name</Label>
                      <Input 
                        id="name"
                        placeholder="John Smith"
                        value={registerName}
                        onChange={(e) => setRegisterName(e.target.value)}
                        required
                        className="font-lato"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-email" className="font-playfair text-family-brown">Email</Label>
                      <Input 
                        id="register-email"
                        type="email"
                        placeholder="your@email.com"
                        value={registerEmail}
                        onChange={(e) => setRegisterEmail(e.target.value)}
                        required
                        className="font-lato"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-password" className="font-playfair text-family-brown">Password</Label>
                      <Input 
                        id="register-password"
                        type="password"
                        placeholder="••••••••"
                        value={registerPassword}
                        onChange={(e) => setRegisterPassword(e.target.value)}
                        required
                        className="font-lato"
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-family-brown hover:bg-family-brown/90 text-white font-lato"
                    >
                      Create Account
                    </Button>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm font-lato text-muted-foreground text-center">
              By continuing, you agree to our Terms of Service and Privacy Policy.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}