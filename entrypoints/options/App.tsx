import { Grid, Theme } from "@radix-ui/themes";
import "./App.css";

import "@radix-ui/themes/styles.css";
import { cssColors } from "../../helpers/colors";
function App() {
  return (
    <Theme
      appearance="dark"
      style={{
        marginTop: "80px",
        padding: " 10px",
        minHeight: "fit-content",
        backgroundColor: "transparent",
      }}
    >
      <Grid columns="3" gap="3">
        {cssColors.map((color) => (
          <div
            key={color.id}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <div
              style={{
                width: "20px",
                height: "20px",
                backgroundColor: color.color,
                marginRight: "10px",
              }}
            />
            <div>{color.variable.replace("--color-", "")}</div>
          </div>
        ))}
      </Grid>
    </Theme>
  );
}

export default App;
