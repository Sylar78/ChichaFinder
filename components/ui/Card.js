// Reusable Card component

export default function Card({ 
  children, 
  className = '',
  hover = true,
  onClick = null 
}) {
  const baseStyles = 'card';
  const hoverStyles = hover ? 'hover-lift cursor-pointer' : '';
  const clickableStyles = onClick ? 'cursor-pointer' : '';

  return (
    <div 
      className={`${baseStyles} ${hoverStyles} ${clickableStyles} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
