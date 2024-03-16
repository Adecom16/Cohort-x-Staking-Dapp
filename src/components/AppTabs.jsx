import { Box, Tabs } from "@radix-ui/themes";

const AppTabs = ({ Stake, Unstake }) => {
  return (
    <Tabs.Root defaultValue="stake">
      <Tabs.List>
        <Tabs.Trigger value="stake">Stake</Tabs.Trigger>
        <Tabs.Trigger value="unstake">Unstake</Tabs.Trigger>
      </Tabs.List>

      <Box px="4" pt="3" pb="2">
        <Tabs.Content value="stake">{Stake}</Tabs.Content>

        <Tabs.Content value="unstake">{Unstake}</Tabs.Content>
      </Box>
    </Tabs.Root>
  );
};

export default AppTabs;
