import { Container } from "@radix-ui/themes";
import { configureWeb3Modal } from "./connection";
import Header from "./components/Header";
import Stake from "./components/Stake";
import Unstake from "./components/Unstake";
import Balance from "./components/Balance";
import "@radix-ui/themes/styles.css";
import { Flex, Box } from "@radix-ui/themes";
import CreatePool from "./components/CreatePool";

configureWeb3Modal();

function App() {
  return (
    <>
      <Container>
        <Header />
        <Flex gap="4">
          <Box>
            <CreatePool className="mt-5" />
            <Balance />
          </Box>

          <Stake />
          <Unstake />
        </Flex>
      </Container>
    </>
  );
}

export default App;
