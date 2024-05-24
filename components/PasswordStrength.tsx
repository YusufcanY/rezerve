import classNames from 'classnames';

export default function PasswordStrength({ password }: { password: string }) {
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const isIntermediate = password?.length > 8 && (hasUpperCase || hasNumber || hasSpecialChar);
  const isStrong = password?.length > 12 && hasUpperCase && hasNumber && hasSpecialChar;

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="flex flex-col items-center">
        <div
          className={classNames('h-2 w-full rounded', {
            'bg-red-600 dark:bg-red-700': !(isIntermediate || isStrong) && password?.length > 0,
            'bg-foreground/25': isIntermediate || isStrong || !password,
          })}
        />
        {!(isIntermediate || isStrong) && password?.length > 0 && (
          <p className="text-red text-sm">Weak</p>
        )}
      </div>
      <div className="flex flex-col items-center">
        <div
          className={classNames('h-2 w-full rounded', {
            'bg-orange-500 dark:bg-orange-700': isIntermediate && !isStrong,
            'bg-foreground/25': !(isIntermediate && !isStrong),
          })}
        />
        {isIntermediate && !isStrong && <p className="text-yellow-natural text-sm">Intermediate</p>}
      </div>
      <div className="flex flex-col items-center">
        <div
          className={classNames('h-2 w-full rounded', {
            'bg-green-500': isStrong,
            'bg-foreground/25': !isStrong,
          })}
        />
        {isStrong && <p className="text-green text-sm">Strong</p>}
      </div>
    </div>
  );
}
