import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Tailwind,
  Text,
  Row,
  Column,
} from '@react-email/components';
import tailwindConfig from './tailwind.config';
import { Button } from './components/button';
import { Alert } from './components/alert';

const TailwindWrapper = Tailwind as React.ComponentType<
  React.PropsWithChildren<{ config: typeof tailwindConfig }>
>;

interface SignInEmailProps {
  email: string;
  loginDate?: string;
  loginTime?: string;
  ipAddress?: string;
  userAgent?: string;
}

const logoUrl = process.env.EMAIL_LOGO_URL || 
  'https://www.scrinfo.net/wp-content/themes/scr/img/scr.svg';

export const SignInEmail = ({
  email,
  loginDate = new Date().toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }),
  loginTime = new Date().toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
  }),
  ipAddress,
  userAgent,
}: SignInEmailProps) => (
  <Html>
    <Head />
    <TailwindWrapper config={tailwindConfig}>
      <Body className="bg-gray-50 font-koala">
        <Preview>
          Nouvelle connexion détectée sur votre compte SCR Info
        </Preview>
        <Container className="mx-auto bg-white py-8 px-6 max-w-[600px]">
          <Img
            src={logoUrl}
            width="170"
            height="50"
            alt="SCR Info"
            className="mx-auto mb-8"
          />
          
          <Text className="text-[24px] font-semibold text-gray-900 mb-4">
            Nouvelle connexion détectée
          </Text>
          
          <Text className="text-[16px] leading-[26px] text-gray-700 mb-6">
            Bonjour,
          </Text>
          
          <Text className="text-[16px] leading-[26px] text-gray-700 mb-6">
            Nous avons détecté une nouvelle connexion à votre compte SCR Info.
            Si vous êtes à l'origine de cette connexion, vous pouvez ignorer cet email.
          </Text>

          <Section className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
            <Text className="text-[14px] font-semibold text-gray-900 mb-4">
              Détails de la connexion :
            </Text>
            
            <Row className="mb-3">
              <Column>
                <Text className="text-[14px] text-gray-600 m-0">Date :</Text>
              </Column>
              <Column>
                <Text className="text-[14px] text-gray-900 font-medium m-0">
                  {loginDate} à {loginTime}
                </Text>
              </Column>
            </Row>
            
            {ipAddress && (
              <Row className="mb-3">
                <Column>
                  <Text className="text-[14px] text-gray-600 m-0">Adresse IP :</Text>
                </Column>
                <Column>
                  <Text className="text-[14px] text-gray-900 font-medium m-0">
                    {ipAddress}
                  </Text>
                </Column>
              </Row>
            )}
            
            {userAgent && (
              <Row className="mb-3">
                <Column>
                  <Text className="text-[14px] text-gray-600 m-0">Appareil :</Text>
                </Column>
                <Column>
                  <Text className="text-[14px] text-gray-900 font-medium m-0">
                    {userAgent}
                  </Text>
                </Column>
              </Row>
            )}
            
            <Row>
              <Column>
                <Text className="text-[14px] text-gray-600 m-0">Compte :</Text>
              </Column>
              <Column>
                <Text className="text-[14px] text-gray-900 font-medium m-0">
                  {email}
                </Text>
              </Column>
            </Row>
          </Section>

          <Alert variant="danger">
            <strong>Important :</strong> Si vous n'êtes pas à l'origine de cette connexion,
            veuillez changer immédiatement votre mot de passe et nous contacter.
          </Alert>

          <Section className="text-center mb-6">
            <Button href="https://www.scrinfo.net">Accéder à mon compte</Button>
          </Section>

          <Hr className="border-gray-200 my-6" />
          
          <Text className="text-[14px] text-gray-600 leading-[22px] mb-4">
            Pour des raisons de sécurité, nous vous informons de toutes les connexions
            à votre compte. Si vous avez des questions ou des préoccupations, n'hésitez
            pas à nous contacter.
          </Text>
          
          <Text className="text-[16px] leading-[26px] text-gray-700">
            Cordialement,
            <br />
            <strong>L'équipe SCR Info</strong>
          </Text>
          
          <Hr className="border-gray-200 my-6" />
          
          <Text className="text-[12px] text-gray-500 text-center">
            SCR Info, LLC
            <br />
            Cet email a été envoyé automatiquement, merci de ne pas y répondre.
          </Text>
        </Container>
      </Body>
    </TailwindWrapper>
  </Html>
)

SignInEmail.PreviewProps = {
  email: 'alan@scrinfo.net',
  loginDate: '15 janvier 2024',
  loginTime: '14:30',
  ipAddress: '192.168.1.1',
  userAgent: 'Chrome sur Windows',
} as SignInEmailProps;

export default SignInEmail;