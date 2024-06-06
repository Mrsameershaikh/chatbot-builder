import { Box, Button } from '@chakra-ui/react'
import React from 'react';
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  return (
    <Box bg='white' w='100%' h='100vh' overflow={'hidden'}>
        <Box as='nav' w='100%' h={12} className={styles.navbarContainer}>
          <Button float='right' h={8} border='1px solid gray'>Save Changes</Button>
        </Box>
        <Box w='100%' h='100%' className={styles.taskSection}>
          
          {/* left section which shows the nodes */}
          <Box w='80%' h='100%' borderRight='1px solid gray' p={4}>
              nodes will display here
          </Box>

          {/* right section which has node setting */}
          <Box w='20%' h='100%' p={4}>
            settings
          </Box>
        </Box>
    </Box>
  )
}

export default Dashboard
