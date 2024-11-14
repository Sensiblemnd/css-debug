import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Link,
  Popover,
  Text,
  Theme,
} from "@radix-ui/themes";
import "./App.css";

import { InfoCircledIcon } from "@radix-ui/react-icons";
import "@radix-ui/themes/styles.css";
import { togglePesticide } from "./helpers copy/toggle-pesticide";
import { togglePesticideHover } from "./helpers copy/toggle-pesticide-hover";
function App() {
  const onClickActive = async () => {
    await togglePesticide();
  };

  const onClickActiveHover = async () => {
    await togglePesticideHover();
  };

  return (
    <Theme
      appearance="dark"
      style={{
        padding: "10px",
        minHeight: "fit-content",
        backgroundColor: "transparent",
      }}
    >
      <Popover.Root>
        <Popover.Trigger>
          <InfoCircledIcon />
        </Popover.Trigger>
        <Popover.Content size="1" maxWidth="300px">
          <Text as="p" trim="both" size="1" style={{ color: "white" }}>
            original css from{" "}
            <Link href="https://github.com/mrmrs/pesticide" target="_blank">
              Learn more about Pesticide on GitHub{" "}
            </Link>
          </Text>
        </Popover.Content>
      </Popover.Root>

      <Grid gap="4" p={"3"} width={"100%"}>
        <Box>
          <Grid columns={{ initial: "1", md: "2" }} gap="3" align={"center"}>
            <Heading size="4" align="center" trim="normal">
              Toggle
            </Heading>
            <Flex align="center" gap="3" justify="center">
              <Button style={{ whiteSpace: "nowrap" }} onClick={onClickActive}>
                Outlines
              </Button>
              <Button
                style={{ whiteSpace: "nowrap" }}
                onClick={onClickActiveHover}
              >
                Outline Hover
              </Button>
            </Flex>
          </Grid>
        </Box>
      </Grid>
    </Theme>
  );
}

export default App;
