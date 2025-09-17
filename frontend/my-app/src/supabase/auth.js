import supabase from "./supabase";


async function signUp(email, password) {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) console.error('Error signing up:', error);
    else console.log('Sign up successful:', data);
  }
  

  async function signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) console.error('Error signing in:', error);
    else console.log('Sign in successful:', data);
  }
  
  async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) console.error('Error signing out:', error);
    else console.log('Sign out successful');
  }
  

  async function checkUser() {
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      console.log(user.id)
    return user.id
    } else {
      console.log('No user is logged in');
    }
  }

  async function getEmail() {
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      console.log(user.id)
    return user.email
    } else {
      console.log('No user is logged in');
    }
  }

  export default {signUp, signIn, signOut, checkUser, getEmail}