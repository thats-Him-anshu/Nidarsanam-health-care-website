import './Card.css';

const Card = ({
  children,
  variant = 'default',
  hover = true,
  className = '',
  icon,
  title,
  description,
  ...props
}) => {
  const classes = `card card-${variant} ${hover ? 'card-hover' : ''} ${className}`.trim();

  // If icon/title/description props are provided, render structured card
  if (icon || title || description) {
    return (
      <div className={classes} {...props}>
        {icon && <div className="card-icon">{icon}</div>}
        {title && <h3 className="card-title">{title}</h3>}
        {description && <p className="card-description">{description}</p>}
        {children}
      </div>
    );
  }

  // Otherwise render children directly
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

export default Card;
