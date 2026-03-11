import { useEffect, useState } from "react";
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
import { addElementListener } from "./helpers/add-element-listener";
import { resetSite } from "./helpers/reset-site";
import { togglePesticide } from "./helpers/toggle-pesticide";
import { togglePesticideHover } from "./helpers/toggle-pesticide-hover";
import { getSiteState, type SiteState } from "../../helpers/storage";
function App() {
  const [active, setActive] = useState<SiteState>({
    outlines: false,
    hover: false,
    clickOutlines: false,
  });

  // On popup open, read persisted state for the current tab's origin
  useEffect(() => {
    (async () => {
      try {
        const tabs = await browser.tabs.query({ active: true, currentWindow: true });
        const url = tabs[0]?.url;
        if (!url) return;
        const state = await getSiteState(new URL(url).origin);
        setActive(state);
      } catch {
        // Cannot read state — leave defaults (all off)
      }
    })();
  }, []);

  const makeHandler = (
    fn: () => Promise<boolean | null>,
    key: keyof SiteState
  ) => async () => {
    const next = await fn();
    if (next !== null) setActive((s) => ({ ...s, [key]: next }));
  };

  const onClickActive = makeHandler(togglePesticide, "outlines");
  const onClickActiveHover = makeHandler(togglePesticideHover, "hover");
  const onClickAddListener = makeHandler(addElementListener, "clickOutlines");

  const onClickReset = async () => {
    await resetSite();
    setActive({ outlines: false, hover: false, clickOutlines: false });
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
              <Button
                style={{ whiteSpace: "nowrap" }}
                variant={active.outlines ? "solid" : "outline"}
                onClick={onClickActive}
              >
                {browser.i18n.getMessage("outlines")}
              </Button>
              <Button
                style={{ whiteSpace: "nowrap" }}
                variant={active.hover ? "solid" : "outline"}
                onClick={onClickActiveHover}
              >
                {browser.i18n.getMessage("outlineHover")}
              </Button>
              <Button
                style={{ whiteSpace: "nowrap" }}
                variant={active.clickOutlines ? "solid" : "outline"}
                onClick={onClickAddListener}
              >
                {browser.i18n.getMessage("clickOutlines")}
              </Button>
              <Button
                style={{ whiteSpace: "nowrap" }}
                variant="ghost"
                color="red"
                onClick={onClickReset}
              >
                {browser.i18n.getMessage("reset")}
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
