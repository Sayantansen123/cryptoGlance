
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth,db ,googleProvider} from '@/lib/firebase';
import { useToast } from "@/hooks/use-toast";


const Register = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
 const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

 const handleGoogleLogin = async () => {
     try {
       const result = await signInWithPopup(auth, googleProvider);
       console.log("Google login successful:", result.user);
       const user = result.user;
       localStorage.setItem('user', JSON.stringify({
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid,
      }));
       toast({
        title: "Account Logged in",
        description: "Welcome! Your account has been successfully logged in.",
        variant: "default",
      });
     } catch (err) {
       console.error("Google login error:", err);
     }
   };


  const handleSignUp = async () => {
    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: "Missing fields",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }
  
    if (password !== confirmPassword) {
      toast({
        title: "Passwords do not match",
        description: "Make sure both passwords are the same.",
        variant: "destructive",
      });
      return;
    }
  
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
  
      // Store name in Firestore
      await setDoc(doc(db, "users", result.user.uid), {
        uid: result.user.uid,
        name: name,
        email: email,
        createdAt: new Date(),
      });

      localStorage.setItem('user', JSON.stringify({
        displayName: name,
        email: email,
        photoURL: "https://i.sstatic.net/l60Hf.png",
      }));
  
      toast({
        title: "Account created",
        description: "Welcome! Your account has been successfully created.",
        variant: "default",
      });
  
      // Optional: Redirect to dashboard or login
    } catch (err: any) {
      if (err.code === "auth/email-already-in-use") {
        toast({
          title: "Email already in use",
          description: "Try logging in or use a different email.",
          variant: "destructive",
        });
      } else if (err.code === "auth/invalid-email") {
        toast({
          title: "Invalid email",
          description: "Enter a valid email address.",
          variant: "destructive",
        });
      } else if (err.code === "auth/weak-password") {
        toast({
          title: "Weak password",
          description: "Password should be at least 6 characters long.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Sign up failed",
          description: "An unexpected error occurred. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted/50 p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full crypto-gradient"></div>
            <h1 className="text-2xl font-bold">CryptoGlance</h1>
          </div>
        </div>

        <Card className="w-full">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Create an account</CardTitle>
            <CardDescription className="text-center">
              Enter your information to create your CryptoGlance account
            </CardDescription>
          </CardHeader>
          <CardContent>
            
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  name="name"
                  placeholder="John Doe"
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  name="email"
                  type="email" 
                  placeholder="name@example.com"
                  value={email} onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  name="password"
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
                  name="confirmPassword"
                  type="password" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              
              
              <Button 
                type="submit" 
                className="w-full mt-2" 
                onClick={handleSignUp}
              >
                submit
              </Button>
          

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <Button variant="outline" type="button" onClick={handleGoogleLogin}>
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Google
              </Button>
            </div>
          </CardContent>
          <CardFooter className="justify-center">
            <div className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:underline">
                Log in
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Register;
