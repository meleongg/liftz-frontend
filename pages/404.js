import { Box, Text } from "@chakra-ui/react";
import Head from "next/head";

const metadata = {
    title: "404 | liftz",
    description: "404 Page not Found Error page",
    image: "https://liftz-workout-tracker.vercel.app/meta-image.png",
};

const Custom404 = () => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            h="100vh"
            fontSize="30px"
            pl="30px"
            pr="30px"
            textAlign="center"
        >
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
            <Text fontWeight="700" mb="20px">
                404: Page Not Found
            </Text>
            <Text>Sorry! This page does not exist!</Text>
        </Box>
    );
};

export default Custom404;
