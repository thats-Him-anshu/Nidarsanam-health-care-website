import { Link } from 'react-router-dom';
import './Button.css';

const Button = ({
  children,
  to,
  href,
  variant = 'primary',
  size = 'md',
  icon,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  ...props
}) => {
  const classes = `btn btn-${variant} btn-${size} ${className}`.trim();

  // If "to" prop exists, render as React Router Link
  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {icon && <span className="btn-icon">{icon}</span>}
        <span>{children}</span>
      </Link>
    );
  }

  // If "href" prop exists, render as anchor
  if (href) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer" {...props}>
        {icon && <span className="btn-icon">{icon}</span>}
        <span>{children}</span>
      </a>
    );
  }

  // Default: render as button
  return (
    <button type={type} className={classes} onClick={onClick} disabled={disabled} {...props}>
      {icon && <span className="btn-icon">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};

export default Button;
