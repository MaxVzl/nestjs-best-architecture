import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';
import tailwindConfig from './tailwind.config';

const TailwindWrapper = Tailwind as React.ComponentType<
  React.PropsWithChildren<{ config: typeof tailwindConfig }>
>;

interface SignInEmailProps {
  email: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://www.scrinfo.net/wp-content/themes/scr/img/scr.svg`
  : '';

export const SignInEmail = ({
  email,
}: SignInEmailProps) => (
  <Html>
    <Head />
    <TailwindWrapper config={tailwindConfig}>
      <Body className="bg-white font-koala">
        <Preview>
          The sales intelligence platform that helps you uncover qualified
          leads.
        </Preview>
        <Container className="mx-auto py-5 pb-12">
          <Img
            src={`${baseUrl}/scr.svg`}
            width="170"
            height="50"
            alt="SCR Info"
            className="mx-auto"
          />
          <Text className="text-[16px] leading-[26px]">
            Hi {email},
          </Text>
          <Text className="text-[16px] leading-[26px]">
            Welcome to SCR Info, the sales intelligence platform that helps you
            uncover qualified leads and close deals faster.
          </Text>
          <Section className="text-center">
            <Button
              className="bg-[#5F51E8] rounded-[3px] text-white text-[16px] no-underline text-center block p-3"
              href="https://www.scrinfo.net"
            >
              Get started
            </Button>
          </Section>
          <Text className="text-[16px] leading-[26px]">
            Best,
            <br />
            The SCR Info team
          </Text>
          <Hr className="border-[#cccccc] my-5" />
          <Text className="text-[#8898aa] text-[12px]">
            SCR Info, LLC
          </Text>
        </Container>
      </Body>
    </TailwindWrapper>
  </Html>
)

SignInEmail.PreviewProps = {
  email: 'alan@scrinfo.net',
} as SignInEmailProps;

export default SignInEmail;