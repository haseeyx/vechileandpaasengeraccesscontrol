
import Left from "./Leftside";
import AuthPage from "./Sig";
function SignIn(){
return(
    <>
    
    <div className="grid grid-cols-2 gap-4 p-4">
        {/* Left side with ComponentOne */}
        <div>
          < Left />
          </div>
          <div>
            < AuthPage />
          </div>
       
      </div>
    </>
);
}

export default SignIn;