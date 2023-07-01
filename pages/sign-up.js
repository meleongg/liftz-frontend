import { Box, Text, Link } from "@chakra-ui/react";
import GuestNavbar from "../components/GuestNavbar";
import SignUpForm from "../components/SignUpForm";
import Footer from "../components/Footer";
import Head from "next/head";
import NextLink from "next/link";

const metadata = {
    title: "Sign Up | liftz",
    description: "Sign Up page",
    image: "https://liftz-workout-tracker.vercel.app/meta-image.png",
};

const SignUpPage = () => {
    return (
        <Box backgroundColor="blue.50" minHeight="100vh">
            <Head>
                <title>{metadata.title}</title>
                <meta name="description" content={metadata.description} />
                <meta name="image" content={metadata.image} />

                <meta
                    property="og:url"
                    content="https://liftz-workout-tracker.vercel.app/"
                />
                <meta property="og:type" content="website" />
                <meta property="og:title" content={metadata.title} />
                <meta
                    property="og:description"
                    content={metadata.description}
                />
                <meta property="og:image" content={metadata.image} />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={metadata.title} />
                <meta
                    name="twitter:description"
                    content={metadata.description}
                />
                <meta name="twitter:image" content={metadata.image} />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <GuestNavbar />
            <Box
                color="black.50"
                p="30px 20px 30px 20px"
                display="flex"
                flexDir="column"
                justifyContent="center"
                alignItems="center"
                minHeight={`calc(100vh - 80px - 50px)`}
            >
                <Box
                    backgroundColor="white"
                    p="20px"
                    borderRadius="20px"
                    textAlign="center"
                >
                    <Text fontSize="48px" fontWeight="700" mb="10px">
                        Sign Up
                    </Text>
                    <Box
                        mb="20px"
                        _hover={{
                            cursor: "pointer",
                        }}
                    >
                        Or
                        <Link
                            ml="5px"
                            fontWeight="700"
                            as={NextLink}
                            color="blue.50"
                            href="/login"
                        >
                            Login to your account
                        </Link>
                    </Box>
                    <SignUpForm />
                </Box>
            </Box>
            <Footer />
        </Box>
    );
};

export default SignUpPage;
