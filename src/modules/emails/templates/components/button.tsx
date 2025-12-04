import {
  Button as EmailButton,
} from '@react-email/components';

interface ButtonProps {
  children: React.ReactNode;
  href: string;
}

export const Button = ({ children, href }: ButtonProps) => {
  return (
    <EmailButton
      className="bg-[#5F51E8] rounded-md text-white text-[16px] font-medium no-underline text-center px-6 py-3 inline-block"
      href="https://www.scrinfo.net"
    >
      {children}
    </EmailButton>
  );
};

Button.PreviewProps = {
  children: 'Accéder à mon compte',
} as ButtonProps;

export default Button;