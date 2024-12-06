import {
  Box,
  Button,
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
import { addElementListener } from "./helpers copy/add-element-listener";
import { togglePesticide } from "./helpers copy/toggle-pesticide";
import { togglePesticideHover } from "./helpers copy/toggle-pesticide-hover";
function App() {
  const onClickActive = async () => {
    await togglePesticide();
  };

  const onClickActiveHover = async () => {
    await togglePesticideHover();
  };

  const onClickAddListener = async () => {
    await addElementListener();
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
            <div> {browser.i18n.getMessage("originalCssFrom")}</div>
            <Link href="https://github.com/mrmrs/pesticide" target="_blank">
              {browser.i18n.getMessage("popupLink")}
            </Link>
          </Text>
        </Popover.Content>
      </Popover.Root>

      <Grid gap="4" p={"3"} width={"100%"}>
        <Box>
          <Grid columns={{ initial: "1", md: "2" }} gap="3" align={"center"}>
            <Heading size="4" align="center" trim="normal">
              {browser.i18n.getMessage("toggle")}
            </Heading>
            <Grid rows={{ initial: "1", md: "2" }} gap="3" align={"center"}>
              <Button style={{ whiteSpace: "nowrap" }} onClick={onClickActive}>
                {browser.i18n.getMessage("outlines")}
              </Button>
              <Button
                style={{ whiteSpace: "nowrap" }}
                onClick={onClickActiveHover}
              >
                {browser.i18n.getMessage("outlineHover")}
              </Button>
              <Button
                style={{ whiteSpace: "nowrap" }}
                onClick={onClickAddListener}
              >
                {browser.i18n.getMessage("clickOutlines")}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Grid>
      {/* <div onClick={() => browser.runtime.openOptionsPage()}>options</div> */}
    </Theme>
  );
}

export default App;
