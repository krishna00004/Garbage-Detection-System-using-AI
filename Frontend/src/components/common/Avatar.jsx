const Avatar = ({ name = 'User', src = '', size = 'md' }) => {
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');

  const sizes = {
    sm: 'h-9 w-9 text-xs',
    md: 'h-11 w-11 text-sm',
    lg: 'h-20 w-20 text-xl'
  };

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={`${sizes[size]} rounded-full border border-slate-200 object-cover dark:border-slate-700`}
      />
    );
  }

  return (
    <div
      className={`${sizes[size]} flex items-center justify-center rounded-full bg-brand-light font-semibold text-brand dark:bg-green-950 dark:text-green-300`}
    >
      {initials || 'AI'}
    </div>
  );
};

export default Avatar;
