import {
  Section,
  Text,
} from '@react-email/components';

interface AlertProps {
  children: React.ReactNode;
  variant?: 'danger' | 'warning' | 'info' | 'success';
}

const variantStyles = {
  danger: {
    bg: 'bg-red-50',
    border: 'border-red-500',
    text: 'text-red-800',
  },
  warning: {
    bg: 'bg-yellow-50',
    border: 'border-yellow-500',
    text: 'text-yellow-800',
  },
  info: {
    bg: 'bg-blue-50',
    border: 'border-blue-500',
    text: 'text-blue-800',
  },
  success: {
    bg: 'bg-green-50',
    border: 'border-green-500',
    text: 'text-green-800',
  },
};

export const Alert = ({ children, variant = 'danger' }: AlertProps) => {
  const styles = variantStyles[variant];
  
  return (
    <Section className={`${styles.bg} border-l-4 ${styles.border} p-4 mb-6`}>
      <Text className={`text-[14px] ${styles.text} m-0`}>
        {children}
      </Text>
    </Section>
  );
};

Alert.PreviewProps = {
  children: (
    <>
      <strong>Important :</strong> Si vous n'êtes pas à l'origine de cette connexion,
      veuillez changer immédiatement votre mot de passe et nous contacter.
    </>
  ),
} as AlertProps;

export default Alert;

