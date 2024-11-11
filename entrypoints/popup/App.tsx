import {
  Box,
  Button,
  Callout,
  Flex,
  Grid,
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
    <>
      <Theme
        appearance="dark"
        style={{ minHeight: "fit-content", backgroundColor: "transparent" }}
      >
        {" "}
        <Grid gap="4">
          <Box>
            <div>
              <Grid gap="4">
                <Text as="label" size="2">
                  <Flex gap="2">
                    <Button onClick={onClickActive} size="2">
                      Toggle Pesticide
                    </Button>
                  </Flex>
                </Text>
                <Text as="label" size="2">
                  <Flex gap="2">
                    <Button onClick={onClickActiveHover} size="2">
                      Toggle Pesticide Hover
                    </Button>
                  </Flex>
                </Text>
              </Grid>
            </div>
          </Box>
          <footer>
            <Callout.Root size="1">
              <Callout.Icon>
                <InfoCircledIcon />
              </Callout.Icon>
              <Callout.Text>
                original css from{" "}
                <a href="https://github.com/mrmrs/pesticide" target="_blank">
                  Learn more about Pesticide on GitHub{" "}
                </a>
              </Callout.Text>
            </Callout.Root>
          </footer>
        </Grid>
      </Theme>
    </>
  );
}

export default App;
