
import { SignedIn, SignedOut, SignInButton, useSession } from "@clerk/clerk-react";
import Form from "./components/add-property/Form";


function App() {
  return (
    <>
      
        <SignedIn>
            <Form />
        </SignedIn>
        <SignedOut>
          <SignInButton />
        </SignedOut>
      
    </>
  );
}

export default App;
