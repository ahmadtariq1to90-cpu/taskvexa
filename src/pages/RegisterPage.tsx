import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "../components/ui/Button";
import { ArrowRight, ArrowLeft, Mail, Lock, CheckCircle2, AlertCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { CustomSelect } from "../components/ui/CustomSelect";
import { supabase } from "../lib/supabase";

const locationData: Record<string, string[]> = {
  "Pakistan": ["Karachi", "Lahore", "Islamabad", "Rawalpindi", "Faisalabad", "Multan", "Peshawar", "Quetta", "Sialkot", "Gujranwala", "Hyderabad", "Abbottabad", "Bahawalpur", "Sargodha", "Sukkur", "Larkana", "Sheikhupura", "Jhang", "Rahim Yar Khan", "Gujrat"],
  "India": ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata", "Surat", "Pune", "Jaipur", "Ahmedabad", "Lucknow", "Kanpur", "Nagpur", "Indore", "Thane", "Bhopal", "Visakhapatnam", "Pimpri-Chinchwad", "Patna", "Vadodara"],
  "United States": ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "San Diego", "Dallas", "San Jose", "Austin", "Jacksonville", "Fort Worth", "Columbus", "San Francisco", "Charlotte", "Indianapolis", "Seattle", "Denver", "Washington"],
  "United Kingdom": ["London", "Birmingham", "Manchester", "Glasgow", "Liverpool", "Bristol", "Sheffield", "Leeds", "Edinburgh", "Leicester", "Coventry", "Bradford", "Cardiff", "Belfast", "Nottingham", "Derby", "Southampton", "Portsmouth", "Plymouth", "Reading"],
  "Canada": ["Toronto", "Montreal", "Vancouver", "Calgary", "Edmonton", "Ottawa", "Winnipeg", "Quebec City", "Hamilton", "Kitchener", "London", "Victoria", "Halifax", "Oshawa", "Windsor", "Saskatoon", "Regina", "St. John's", "Barrie", "Kelowna"],
  "Australia": ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide", "Gold Coast", "Newcastle", "Canberra", "Sunshine Coast", "Wollongong", "Geelong", "Hobart", "Townsville", "Cairns", "Darwin", "Toowoomba", "Ballarat", "Bendigo", "Albury", "Launceston"],
  "Germany": ["Berlin", "Munich", "Frankfurt", "Hamburg", "Cologne", "Stuttgart", "Düsseldorf", "Leipzig", "Dortmund", "Essen", "Bremen", "Dresden", "Hanover", "Nuremberg", "Duisburg", "Bochum", "Wuppertal", "Bielefeld", "Bonn", "Münster"],
  "France": ["Paris", "Marseille", "Lyon", "Toulouse", "Nice", "Nantes", "Strasbourg", "Montpellier", "Bordeaux", "Lille", "Rennes", "Reims", "Le Havre", "Saint-Étienne", "Toulon", "Grenoble", "Dijon", "Nîmes", "Angers", "Villeurbanne"],
  "Brazil": ["São Paulo", "Rio de Janeiro", "Brasília", "Salvador", "Fortaleza", "Belo Horizonte", "Manaus", "Curitiba", "Recife", "Goiânia", "Belém", "Porto Alegre", "Guarulhos", "Campinas", "São Luís", "São Gonçalo", "Maceió", "Duque de Caxias", "Natal", "Teresina"],
  "Japan": ["Tokyo", "Yokohama", "Osaka", "Nagoya", "Sapporo", "Fukuoka", "Kobe", "Kyoto", "Kawasaki", "Saitama", "Hiroshima", "Sendai", "Kitakyushu", "Chiba", "Sakai", "Niigata", "Hamamatsu", "Kumamoto", "Sagamihara", "Shizuoka"],
  "Other": []
};

const days = Array.from({length: 31}, (_, i) => (i + 1).toString());
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const years = Array.from({length: 100}, (_, i) => (new Date().getFullYear() - i).toString());

export function RegisterPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  // Auth State
  const [isOAuth, setIsOAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [phoneCountry, setPhoneCountry] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [enteredReferralCode, setEnteredReferralCode] = useState("");
  const [referredBy, setReferredBy] = useState<string | null>(null);
  
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [customCity, setCustomCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [gender, setGender] = useState("");
  const [occupation, setOccupation] = useState("");
  const [reason, setReason] = useState("");
  const [workTime, setWorkTime] = useState("");
  const [source, setSource] = useState("");
  
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);
  const [isAlreadyRegistered, setIsAlreadyRegistered] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const checkSession = async () => {
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const searchParams = new URLSearchParams(window.location.search);
      const errorDesc = hashParams.get('error_description') || searchParams.get('error_description');
      
      if (errorDesc) {
        setError("Login Error: " + errorDesc.replace(/\+/g, ' '));
        window.history.replaceState(null, '', window.location.pathname);
        return;
      }

      // Use getUser() for real-time auth check instead of just getSession()
      const { data: { user: authUser }, error: authError } = await supabase.auth.getUser();
      
      if (authUser && !authError) {
        const { data: user } = await supabase
          .from('users')
          .select('id')
          .eq('id', authUser.id)
          .maybeSingle();
        
        if (user) {
          // Only show "Already Registered" if they have a full profile and we aren't in the middle of registering
          if (step < 4) {
            setIsAlreadyRegistered(true);
          }
        } else {
          // Authenticated but profile incomplete
          const { data: { session } } = await supabase.auth.getSession();
          
          // Check if user is blocked (Supabase doesn't return blocked users in getUser usually, 
          // but we check for session validity)
          if (!session) {
            await supabase.auth.signOut();
            return;
          }

          setIsOAuth(!!authUser.app_metadata?.provider && authUser.app_metadata.provider !== 'email');
          setEmail(authUser.email || "");
          
          // Restore from localStorage if available
          const savedPhoneCountry = localStorage.getItem('reg_phoneCountry');
          const savedPhoneNumber = localStorage.getItem('reg_phoneNumber');
          const savedReferral = localStorage.getItem('reg_referralCode');
          const savedReferredBy = localStorage.getItem('reg_referredBy');
          if (savedPhoneCountry) setPhoneCountry(savedPhoneCountry);
          if (savedPhoneNumber) setPhoneNumber(savedPhoneNumber);
          if (savedReferral) setEnteredReferralCode(savedReferral);
          if (savedReferredBy) setReferredBy(savedReferredBy);

          const fullName = authUser.user_metadata?.full_name;
          if (fullName) {
            const nameParts = fullName.split(" ");
            if (nameParts.length > 0) setFirstName(nameParts[0]);
            if (nameParts.length > 1) setLastName(nameParts.slice(1).join(" "));
          }
          
          setStep(4);
          setShowConfirmationPopup(false);
        }
      }
    };
    
    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') {
        checkSession();
      }
    });

    if (window.opener) {
      setTimeout(() => {
        window.opener.postMessage({ type: 'OAUTH_SUCCESS' }, '*');
        window.close();
      }, 1500);
    }

    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'OAUTH_SUCCESS') {
        checkSession();
      }
    };
    window.addEventListener('message', handleMessage);

    return () => {
      subscription.unsubscribe();
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  const getPasswordStrength = (pass: string) => {
    let score = 0;
    if (!pass) return { score: 0, color: 'bg-dark-800', width: '0%' };
    if (pass.length >= 8) score += 1;
    if (/[A-Z]/.test(pass) && /[a-z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(pass)) score += 1;

    if (score === 1) return { score, color: 'bg-red-500', width: '25%' };
    if (score === 2) return { score, color: 'bg-orange-500', width: '50%' };
    if (score === 3) return { score, color: 'bg-yellow-500', width: '75%' };
    if (score === 4) return { score, color: 'bg-green-500', width: '100%' };
    return { score: 0, color: 'bg-red-500', width: '10%' };
  };

  const strength = getPasswordStrength(password);

  const validateStep = () => {
    setError("");
    if (step === 1) {
      if (!email || !phoneCountry || !phoneNumber) return "All fields are required.";
      if (!email.toLowerCase().endsWith("@gmail.com")) return "Only @gmail.com emails are allowed.";
      
      if (phoneCountry === "Pakistan") {
        if (!phoneNumber.startsWith("03")) return "Pakistan phone numbers must start with 03.";
        if (phoneNumber.length !== 11) return "Pakistan phone numbers must be exactly 11 digits.";
      } else if (phoneCountry === "India") {
        if (!/^[6-9]/.test(phoneNumber)) return "India phone numbers must start with 6, 7, 8, or 9.";
        if (phoneNumber.length !== 10) return "India phone numbers must be exactly 10 digits.";
      } else if (phoneCountry === "United States" || phoneCountry === "Canada") {
        if (!/^[1]/.test(phoneNumber)) return "US/Canada phone numbers must start with 1.";
        if (phoneNumber.length !== 11) return "US/Canada phone numbers must be exactly 11 digits (including 1).";
      } else {
        if (phoneNumber.length < 8 || phoneNumber.length > 15) return "Please enter a valid phone number.";
      }
    } else if (step === 2) {
      if (password.length < 8) return "Password must be at least 8 characters long.";
      if (!/[A-Z]/.test(password) || !/[a-z]/.test(password)) return "Password must contain uppercase and lowercase letters.";
      if (!/[0-9]/.test(password)) return "Password must contain at least one number.";
      if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) return "Password must contain at least one special character.";
      if (password !== confirmPassword) return "Passwords do not match.";
    } else if (step === 4) {
      if (!firstName || !lastName) return "All fields are required.";
    } else if (step === 5) {
      if (!country) return "Please select a country.";
      if (country === "Other" && !customCity) return "Please enter your city.";
      if (country !== "Other" && !city) return "Please select a city.";
      if (!postalCode) return "Please enter your postal code.";
    } else if (step === 6) {
      if (!day || !month || !year) return "Please complete your birthday.";
      if (!gender) return "Please select your gender.";
    } else if (step === 7) {
      if (!occupation || !reason || !workTime || !source) return "All fields are required.";
    }
    return "";
  };

  const checkEmailExists = async (emailToCheck: string) => {
    if (!emailToCheck || !emailToCheck.includes("@")) return;
    try {
      const { data, error } = await supabase
        .from('users')
        .select('email')
        .ilike('email', emailToCheck)
        .maybeSingle();
      
      if (data) {
        setError("This email is already registered. Please download the app and login.");
        return true;
      }
    } catch (err) {
      console.error("Error checking email:", err);
    }
    return false;
  };

  const handleNextStep = async () => {
    const validationError = validateStep();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError("");

    if (step === 1) {
      setIsLoading(true);
      try {
        // Real-time check against the users table
        const { data, error: dbError } = await supabase
          .from('users')
          .select('email')
          .ilike('email', email)
          .maybeSingle();
          
        if (dbError) {
          console.error("Error checking email:", dbError);
          // If there's a DB error, we might want to proceed or block. 
          // Let's block to be safe if it's a real error.
        }

        if (data) {
          setError("This email is already registered. Please download the app and login.");
          setIsLoading(false);
          return;
        }
      } catch (err) {
        console.error("Error checking email:", err);
      }
      setIsLoading(false);
    }

    setStep((prev) => prev + 1);
  };

  const handlePrevStep = () => {
    setError("");
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSignUp = async (skipReferral = false) => {
    if (!skipReferral) {
      if (!enteredReferralCode) {
        setError("Please enter a referral code or click Skip.");
        return;
      }
      
      setIsLoading(true);
      setError("");
      
      try {
        // Strict referral code validation
        const { data: referrer, error: referrerError } = await supabase
          .from('users')
          .select('id, referral_code')
          .eq('referral_code', enteredReferralCode.toUpperCase())
          .maybeSingle();

        if (referrerError) throw referrerError;
        
        if (!referrer) {
          setError("Invalid referral code. This code does not exist.");
          setIsLoading(false);
          return;
        }
        
        setReferredBy(referrer.referral_code);
        localStorage.setItem('reg_referredBy', referrer.referral_code);
      } catch (err: any) {
        setError("Error validating referral code: " + err.message);
        setIsLoading(false);
        return;
      }
    } else {
      setReferredBy(null);
      setEnteredReferralCode("");
    }

    setIsLoading(true);
    setError("");
    try {
      localStorage.setItem('reg_phoneCountry', phoneCountry);
      localStorage.setItem('reg_phoneNumber', phoneNumber);
      if (!skipReferral) {
        localStorage.setItem('reg_referralCode', enteredReferralCode);
      } else {
        localStorage.removeItem('reg_referralCode');
        localStorage.removeItem('reg_referredBy');
      }

      // Attempt to sign up
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      // If user already exists in auth.users but registration was incomplete
      if (authError && (authError.message.includes("already registered") || authError.status === 422)) {
        // Try to sign in instead to resume registration
        const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) {
          if (signInError.message.includes("Invalid login credentials")) {
            throw new Error("This email is already registered with a different password.");
          }
          throw signInError;
        }

        if (signInData.user) {
          // Check if profile exists
          const { data: existingProfile } = await supabase
            .from('users')
            .select('id')
            .eq('id', signInData.user.id)
            .maybeSingle();
          
          if (existingProfile) {
            setIsAlreadyRegistered(true);
            setIsLoading(false);
            return;
          }
          
          // If no profile, proceed to step 4
          setStep(4);
          setIsLoading(false);
          return;
        }
      }

      if (authError) throw authError;
      if (!authData.user) throw new Error("Failed to create user account.");
      
      if (authData.user.identities && authData.user.identities.length === 0) {
        // This usually means email exists. Let's try to sign in to resume.
        const { data: signInData, error: signInErr } = await supabase.auth.signInWithPassword({ email, password });
        if (signInData?.user && !signInErr) {
           // Check if profile exists for this signed in user
           const { data: prof } = await supabase.from('users').select('id').eq('id', signInData.user.id).maybeSingle();
           if (prof) {
             setIsAlreadyRegistered(true);
             setIsLoading(false);
             return;
           }
           setStep(4);
           setIsLoading(false);
           return;
        }
        throw new Error("Email already registered. Please download the app and login.");
      }
      
      if (authData.session) {
        setStep(4);
      } else {
        setShowConfirmationPopup(true);
      }
    } catch (err: any) {
      if (err.message?.includes("Error sending confirmation email") || err.message?.includes("rate limit")) {
        setError("Supabase email limit reached. Please disable 'Confirm Email' in your Supabase Auth settings or try again later.");
      } else {
        setError(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleFinalize = async () => {
    const validationError = validateStep();
    if (validationError) {
      setError(validationError);
      return;
    }
    
    setIsLoading(true);
    setError("");
    
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("Authentication session lost. Please try again.");
      
      const userId = session.user.id;
      const avatarUrl = session.user.user_metadata?.avatar_url || "";
      
      // Generate a unique referral code for the new user
      const myReferralCode = 'TV-' + Math.random().toString(36).substring(2, 8).toUpperCase();

      const monthIndex = months.indexOf(month) + 1;
      const formattedMonth = monthIndex < 10 ? `0${monthIndex}` : `${monthIndex}`;
      const formattedDay = parseInt(day) < 10 ? `0${day}` : day;
      const formattedDate = `${year}-${formattedMonth}-${formattedDay}`;

      const { error: dbError } = await supabase
        .from('users')
        .upsert([
          {
            id: userId,
            first_name: firstName,
            last_name: lastName,
            email: email,
            phone_country: phoneCountry,
            phone_number: phoneNumber,
            country: country,
            city: country === "Other" ? customCity : city,
            postal_code: postalCode,
            date_of_birth: formattedDate,
            gender: gender,
            avatar_url: avatarUrl,
            referral_code: myReferralCode,
            referred_by: referredBy,
            occupation: occupation,
            reason: reason,
            work_time: workTime,
            source: source
          }
        ]);

      if (dbError) {
        throw new Error(`Database Error: ${dbError.message}. Please check your Supabase table schema or RLS policies.`);
      }

      localStorage.removeItem('reg_phoneCountry');
      localStorage.removeItem('reg_phoneNumber');
      localStorage.removeItem('reg_referralCode');
      localStorage.removeItem('reg_referredBy');

      setStep(8);
    } catch (err: any) {
      setError(err.message || "An error occurred during registration.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      if (phoneCountry) localStorage.setItem('reg_phoneCountry', phoneCountry);
      if (phoneNumber) localStorage.setItem('reg_phoneNumber', phoneNumber);
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin + '/',
        }
      });
      if (error) throw error;
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 flex items-center justify-center relative overflow-hidden">
      {isAlreadyRegistered ? (
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-md mx-auto">
            <div className="glass-card rounded-3xl p-8 relative overflow-hidden text-center">
              <div className="w-20 h-20 rounded-full bg-brand-500/20 flex items-center justify-center mx-auto mb-6">
                <AlertCircle size={40} className="text-brand-400" />
              </div>
              <h2 className="text-2xl font-display font-bold mb-4">Already Registered</h2>
              <p className="text-gray-300 mb-8">
                You are already registered. Please download the app and login.
              </p>
              <div className="space-y-4">
                <Link to="/download">
                  <Button className="w-full">Download App</Button>
                </Link>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={async () => {
                    await supabase.auth.signOut();
                    setIsAlreadyRegistered(false);
                    setStep(1);
                    window.location.reload();
                  }}
                >
                  Logout & Try Again
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Email Confirmation Popup */}
          <AnimatePresence>
        {showConfirmationPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-dark-800 border border-white/10 p-8 rounded-3xl max-w-md w-full text-center shadow-2xl"
            >
              <div className="w-16 h-16 bg-brand-500/20 text-brand-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail size={32} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Check Your Email</h3>
              <p className="text-gray-300 mb-8">
                Confirmation email has been sent. Please confirm your email to complete the registration.
              </p>
              <Button 
                onClick={() => window.open('https://mail.google.com', '_blank')} 
                className="w-full mb-4"
              >
                Confirm Email
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Static Background to prevent lag */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-brand-500/20 rounded-full blur-[80px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-[80px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-md mx-auto">
          <div className="glass-card rounded-3xl p-8 relative overflow-hidden">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-6"
                >
                  <div className="text-center mb-4">
                    <h2 className="text-2xl font-display font-bold mb-2">Create Account</h2>
                    <p className="text-gray-400 text-sm">Join Taskvexa and start making money today.</p>
                  </div>

                  {error && (
                    <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-2 text-red-400 text-sm">
                      <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
                      <p>{error}</p>
                    </div>
                  )}

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1.5">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                        <input 
                          type="email" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          onBlur={(e) => checkEmailExists(e.target.value)}
                          disabled={isOAuth}
                          placeholder="you@gmail.com" 
                          className={`w-full h-12 pl-11 pr-4 rounded-xl glass bg-dark-900/50 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors ${isOAuth ? 'opacity-50 cursor-not-allowed' : ''}`}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1.5">Phone Number</label>
                      <div className="flex gap-2">
                        <div className="w-1/3">
                          <CustomSelect 
                            options={Object.keys(locationData)} 
                            value={phoneCountry} 
                            onChange={setPhoneCountry} 
                            placeholder="Country" 
                          />
                        </div>
                        <div className="w-2/3 relative">
                          <input 
                            type="tel" 
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                            maxLength={phoneCountry === "Pakistan" ? 11 : (phoneCountry === "India" ? 10 : (phoneCountry === "United States" || phoneCountry === "Canada" ? 11 : 15))}
                            placeholder={phoneCountry === "Pakistan" ? "03XXXXXXXXX" : "Phone Number"} 
                            className="w-full h-12 px-4 rounded-xl glass bg-dark-900/50 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="relative flex items-center py-2">
                      <div className="flex-grow border-t border-white/10"></div>
                      <span className="flex-shrink-0 mx-4 text-gray-500 text-sm">OR</span>
                      <div className="flex-grow border-t border-white/10"></div>
                    </div>

                    <Button type="button" onClick={handleGoogleLogin} variant="secondary" className="w-full gap-3 bg-white text-dark-900 hover:bg-gray-100">
                      <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                        <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                          <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
                          <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
                          <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
                          <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
                        </g>
                      </svg>
                      Register with Google
                    </Button>
                  </div>

                  <Button onClick={handleNextStep} disabled={isLoading} className="w-full mt-2 gap-2">
                    {isLoading ? "Checking..." : "Next"} <ArrowRight size={18} />
                  </Button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-6"
                >
                  <div className="text-center mb-4">
                    <h2 className="text-2xl font-display font-bold mb-2">Secure Account</h2>
                    <p className="text-gray-400 text-sm">Create a strong password to protect your earnings.</p>
                  </div>

                  {error && (
                    <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-2 text-red-400 text-sm">
                      <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
                      <p>{error}</p>
                    </div>
                  )}

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1.5">Password</label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                        <input 
                          type="password" 
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••" 
                          className="w-full h-12 pl-11 pr-4 rounded-xl glass bg-dark-900/50 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors"
                        />
                      </div>
                      <div className="mt-2">
                        <div className="flex justify-between text-xs text-gray-400 mb-1">
                          <span>Password Strength</span>
                          <span className={strength.score === 4 ? 'text-green-400' : strength.score >= 2 ? 'text-yellow-400' : 'text-red-400'}>
                            {strength.score === 4 ? 'Strong' : strength.score >= 2 ? 'Fair' : 'Weak'}
                          </span>
                        </div>
                        <div className="w-full h-1.5 bg-dark-800 rounded-full overflow-hidden">
                          <div className={`h-full transition-all duration-300 ${strength.color}`} style={{ width: strength.width }}></div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Must contain uppercase, lowercase, number, and symbol.</p>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1.5">Confirm Password</label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                        <input 
                          type="password" 
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="••••••••" 
                          className="w-full h-12 pl-11 pr-4 rounded-xl glass bg-dark-900/50 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-2">
                    <Button variant="outline" onClick={handlePrevStep} className="px-4">
                      <ArrowLeft size={18} />
                    </Button>
                    <Button onClick={handleNextStep} className="flex-1 gap-2">
                      Next <ArrowRight size={18} />
                    </Button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-6"
                >
                  <div className="text-center mb-4">
                    <h2 className="text-2xl font-display font-bold mb-2">Referral Code</h2>
                    <p className="text-gray-400 text-sm">Were you invited by a friend?</p>
                  </div>

                  {error && (
                    <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-2 text-red-400 text-sm">
                      <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
                      <p>{error}</p>
                    </div>
                  )}

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1.5">Referral Code (Optional)</label>
                      <input 
                        type="text" 
                        value={enteredReferralCode}
                        onChange={(e) => setEnteredReferralCode(e.target.value.toUpperCase())}
                        placeholder="Enter code if you have one" 
                        className="w-full h-12 px-4 rounded-xl glass bg-dark-900/50 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 mt-2">
                    <Button variant="outline" onClick={() => handleSignUp(true)} disabled={isLoading} className="flex-1">
                      {isLoading ? "Loading..." : "Skip"}
                    </Button>
                    <Button onClick={() => handleSignUp(false)} disabled={isLoading} className="flex-1 gap-2">
                      {isLoading ? "Validating..." : "Next"} <ArrowRight size={18} />
                    </Button>
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-6"
                >
                  <div className="text-center mb-4">
                    <h2 className="text-2xl font-display font-bold mb-2">Personal Details</h2>
                    <p className="text-gray-400 text-sm">Tell us your name to personalize your experience.</p>
                  </div>

                  {error && (
                    <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-2 text-red-400 text-sm">
                      <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
                      <p>{error}</p>
                    </div>
                  )}

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1.5">First Name</label>
                      <input 
                        type="text" 
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="John" 
                        className="w-full h-12 px-4 rounded-xl glass bg-dark-900/50 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1.5">Last Name</label>
                      <input 
                        type="text" 
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Doe" 
                        className="w-full h-12 px-4 rounded-xl glass bg-dark-900/50 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 mt-2">
                    <Button onClick={handleNextStep} className="w-full gap-2">
                      Next <ArrowRight size={18} />
                    </Button>
                  </div>
                </motion.div>
              )}

              {step === 5 && (
                <motion.div
                  key="step5"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-6"
                >
                  <div className="text-center mb-4">
                    <h2 className="text-2xl font-display font-bold mb-2">Location</h2>
                    <p className="text-gray-400 text-sm">Where are you from? This helps us find relevant tasks.</p>
                  </div>

                  {error && (
                    <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-2 text-red-400 text-sm">
                      <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
                      <p>{error}</p>
                    </div>
                  )}

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1.5">Country</label>
                      <CustomSelect 
                        options={Object.keys(locationData)} 
                        value={country} 
                        onChange={(val) => { setCountry(val); setCity(""); setCustomCity(""); }} 
                        placeholder="Select Country" 
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1.5">City</label>
                        {country === "Other" ? (
                          <input 
                            type="text" 
                            value={customCity}
                            onChange={(e) => setCustomCity(e.target.value)}
                            placeholder="Enter City" 
                            className="w-full h-12 px-4 rounded-xl glass bg-dark-900/50 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors"
                          />
                        ) : (
                          <CustomSelect 
                            options={country ? locationData[country] : []} 
                            value={city} 
                            onChange={setCity} 
                            placeholder="Select City" 
                          />
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1.5">Postal / ZIP Code</label>
                        <input 
                          type="text" 
                          value={postalCode}
                          onChange={(e) => setPostalCode(e.target.value)}
                          placeholder="10001" 
                          className="w-full h-12 px-4 rounded-xl glass bg-dark-900/50 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-2">
                    <Button variant="outline" onClick={handlePrevStep} className="px-4">
                      <ArrowLeft size={18} />
                    </Button>
                    <Button onClick={handleNextStep} className="flex-1 gap-2">
                      Next <ArrowRight size={18} />
                    </Button>
                  </div>
                </motion.div>
              )}

              {step === 6 && (
                <motion.div
                  key="step6"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-6"
                >
                  <div className="text-center mb-4">
                    <h2 className="text-2xl font-display font-bold mb-2">Demographics</h2>
                    <p className="text-gray-400 text-sm">Just a few more details to set up your profile.</p>
                  </div>

                  {error && (
                    <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-2 text-red-400 text-sm">
                      <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
                      <p>{error}</p>
                    </div>
                  )}

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1.5">Birthday</label>
                      <div className="grid grid-cols-3 gap-2">
                        <CustomSelect options={days} value={day} onChange={setDay} placeholder="Day" />
                        <CustomSelect options={months} value={month} onChange={setMonth} placeholder="Month" />
                        <CustomSelect options={years} value={year} onChange={setYear} placeholder="Year" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1.5">Gender</label>
                      <CustomSelect 
                        options={["Male", "Female", "Other", "Prefer not to say"]} 
                        value={gender} 
                        onChange={setGender} 
                        placeholder="Select Gender" 
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 mt-2">
                    <Button variant="outline" onClick={handlePrevStep} className="px-4">
                      <ArrowLeft size={18} />
                    </Button>
                    <Button onClick={handleNextStep} className="flex-1 gap-2">
                      Next <ArrowRight size={18} />
                    </Button>
                  </div>
                </motion.div>
              )}

              {step === 7 && (
                <motion.div
                  key="step7"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-6"
                >
                  <div className="text-center mb-4">
                    <h2 className="text-2xl font-display font-bold mb-2">Personal Questions</h2>
                    <p className="text-gray-400 text-sm">Help us understand your goals.</p>
                  </div>

                  {error && (
                    <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-2 text-red-400 text-sm">
                      <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
                      <p>{error}</p>
                    </div>
                  )}

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1.5">What do you do?</label>
                      <CustomSelect 
                        options={["Student", "Employed", "Freelancer", "Unemployed", "Other"]} 
                        value={occupation} 
                        onChange={setOccupation} 
                        placeholder="Select occupation" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1.5">Why did you join this app?</label>
                      <CustomSelect 
                        options={["To earn extra income", "To kill free time", "To try something new", "Other"]} 
                        value={reason} 
                        onChange={setReason} 
                        placeholder="Select reason" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1.5">How much time will you work?</label>
                      <div className="grid grid-cols-2 gap-3">
                        <label className={`flex items-center justify-center gap-2 h-12 rounded-xl glass border cursor-pointer transition-colors ${workTime === 'part-time' ? 'border-brand-500 bg-brand-500/10 text-brand-400' : 'border-white/10 bg-dark-900/50 hover:bg-white/5'}`}>
                          <input 
                            type="radio" 
                            name="workTime" 
                            value="part-time" 
                            checked={workTime === "part-time"}
                            onChange={() => setWorkTime("part-time")}
                            className="hidden" 
                          />
                          <span className="text-sm font-medium">Part-time</span>
                        </label>
                        <label className={`flex items-center justify-center gap-2 h-12 rounded-xl glass border cursor-pointer transition-colors ${workTime === 'full-time' ? 'border-brand-500 bg-brand-500/10 text-brand-400' : 'border-white/10 bg-dark-900/50 hover:bg-white/5'}`}>
                          <input 
                            type="radio" 
                            name="workTime" 
                            value="full-time" 
                            checked={workTime === "full-time"}
                            onChange={() => setWorkTime("full-time")}
                            className="hidden" 
                          />
                          <span className="text-sm font-medium">Full-time</span>
                        </label>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1.5">Where did you hear about this app?</label>
                      <CustomSelect 
                        options={["Social Media", "Friend / Family", "Search Engine", "Advertisement", "Other"]} 
                        value={source} 
                        onChange={setSource} 
                        placeholder="Select source" 
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 mt-2">
                    <Button variant="outline" onClick={handlePrevStep} disabled={isLoading} className="px-4">
                      <ArrowLeft size={18} />
                    </Button>
                    <Button onClick={handleFinalize} disabled={isLoading} className="flex-1 gap-2">
                      {isLoading ? "Registering..." : "Complete Registration"} <ArrowRight size={18} />
                    </Button>
                  </div>
                </motion.div>
              )}

              {step === 8 && (
                <motion.div
                  key="step8"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, type: "spring" }}
                  className="flex flex-col items-center text-center py-8"
                >
                  <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mb-6">
                    <CheckCircle2 size={40} className="text-green-400" />
                  </div>
                  <h2 className="text-3xl font-display font-bold mb-4">Registration Complete!</h2>
                  <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                    "Congratulations! You are now part of our family. Download the application, log in, and start earning."
                  </p>
                  <Link to="/download" className="w-full">
                    <Button className="w-full">Download App</Button>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      </>
      )}
    </div>
  );
}
