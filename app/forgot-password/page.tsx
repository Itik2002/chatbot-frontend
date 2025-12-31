export default function ForgotPasswordPage() {
  return (
    <div className="auth-container">
      <h2>Reset your password</h2>

      <label>Email Address</label>
      <input type="email" placeholder="Email" />

      <button className="primary-btn">Send Email</button>
    </div>
  );
}
