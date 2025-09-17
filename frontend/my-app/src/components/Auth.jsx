import React, { useState } from 'react';
import auth from "../supabase/auth";
import styles from "../styles/Auth.module.css"
function Auth() {
  const [activeTab, setActiveTab] = useState('login');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h2 style={{ fontSize: '20px', fontWeight: 'normal' }}>Traffic Alarm</h2>
        </div>

        <div className={styles.tabContainer}>
          <div
            className={`${styles.tab} ${activeTab === 'login' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('login')}
          >
            Login
          </div>
          <div
            className={`${styles.tab} ${activeTab === 'signup' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('signup')}
          >
            Sign Up
          </div>
        </div>

        <div className={styles.formContainer}>
          {activeTab === 'login' ? (
            <>
              <div className={styles.formGroup}>
                <label className={styles.label}>Email</label>
                <input
                  type="email"
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                  className={styles.input}
                  placeholder='Enter your email'
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Password</label>
                <input
                  type="password"
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                  className={styles.input}
                  placeholder='Enter your password'
                />
              </div>

              <div className={styles.formFooter}>
                <a href="#" className={styles.link}>Forgot Password?</a>
                <button
                  type="submit"
                  onClick={() => auth.signIn(loginEmail, loginPassword)}
                  className={styles.button}
                >
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
                  onChange={(e) => setSignupEmail(e.target.value)}
                  required
                  className={styles.input}
                  placeholder='Enter your email'
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Password</label>
                <input
                  type="password"
                  onChange={(e) => setSignupPassword(e.target.value)}
                  required
                  className={styles.input}
                  placeholder='Enter your password'
                />
              </div>

              <div className={styles.formFooter}>
                <div></div>
                <button
                  type="submit"
                  onClick={() => auth.signUp(signupEmail, signupPassword)}
                  className={styles.button}
                >
                  Sign Up
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Auth