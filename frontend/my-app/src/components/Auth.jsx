import React, { useState } from 'react';
import auth from "../supabase/auth";
import styles from "../styles/Auth.module.css";
import MUINotification from "./NotificationMui";

function Auth() {
  const [activeTab, setActiveTab] = useState("login");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  const [notifOpen, setNotifOpen] = useState(false);
  const [notifMessage, setNotifMessage] = useState("");
  const [notifSeverity, setNotifSeverity] = useState("success");

  const handleTabSwitch = (tab) => {
    if (tab === "login") {
      if (signupEmail) setLoginEmail(signupEmail);
      if (signupPassword) setLoginPassword(signupPassword);
    } else if (tab === "signup") {
      if (loginEmail) setSignupEmail(loginEmail);
      if (loginPassword) setSignupPassword(loginPassword);
    }
    setActiveTab(tab);
  };

  async function handleSignUp() {
    const success = await auth.signUp(signupEmail, signupPassword);
    if (success) {
      setNotifMessage("Account created! Please confirm your email address and log in using your credentials.");
      setNotifSeverity("success");
      setNotifOpen(true);
    } else {
      setNotifMessage("Sign-up failed. Please try again.");
      setNotifSeverity("error");
      setNotifOpen(true);
    }
  }

  async function handleSignIn() {
    const success = await auth.signIn(loginEmail, loginPassword);
    if (success) {
      setNotifMessage("Logged in successfully!");
      setNotifSeverity("success");
      setNotifOpen(true);
      
    } else {
      setNotifMessage("Invalid credentials or you have not confirmed your email after sign up. Please try again.");
      setNotifSeverity("error");
      setNotifOpen(true);
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h2 style={{ fontSize: "20px", fontWeight: "normal" }}>Traffic Alarm</h2>
{/*           <button onClick={onClose} className={styles.closeBtn}>
            ✕
          </button> */}
        </div>

        {/* Tabs */}
        <div className={styles.tabContainer}>
          <div
            className={`${styles.tab} ${activeTab === "login" ? styles.activeTab : ""}`}
            onClick={() => handleTabSwitch("login")}
          >
            Login
          </div>
          <div
            className={`${styles.tab} ${activeTab === "signup" ? styles.activeTab : ""}`}
            onClick={() => handleTabSwitch("signup")}
          >
            Sign Up
          </div>
        </div>

        {/* Forms */}
        <div className={styles.formContainer}>
          {activeTab === "login" ? (
            <>
              <div className={styles.formGroup}>
                <label className={styles.label}>Email</label>
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                  className={styles.input}
                  placeholder="Enter your email"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Password</label>
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                  className={styles.input}
                  placeholder="Enter your password"
                />
              </div>

              <div className={styles.formFooter}>
                <a href="#" className={styles.link}>
                  Forgot Password?
                </a>
                <button type="submit" onClick={handleSignIn} className={styles.button}>
                  Login
                </button>
              </div>
            </>
          ) : (
            <>
              <div className={styles.formGroup}>
                <label className={styles.label}>Email</label>
                <input
                  type="email"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  required
                  className={styles.input}
                  placeholder="Enter your email"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Password</label>
                <input
                  type="password"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  required
                  className={styles.input}
                  placeholder="Enter your password"
                />
              </div>

              <div className={styles.formFooter}>
                <div></div>
                <button type="submit" onClick={handleSignUp} className={styles.button}>
                  Sign Up
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Notification */}
      <MUINotification
        open={notifOpen}
        message={notifMessage}
        severity={notifSeverity}
        onClose={() => setNotifOpen(false)}
      />
    </div>
  );
}

export default Auth;
