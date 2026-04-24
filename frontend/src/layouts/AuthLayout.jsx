import PropTypes from "prop-types";
export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background text-foreground">
      <div className="w-full max-w-md p-8 bg-card rounded-xl shadow-lg border border-border">
        {children}
      </div>
    </div>
  );
}

AuthLayout.propTypes = {
  children: PropTypes.node,
};