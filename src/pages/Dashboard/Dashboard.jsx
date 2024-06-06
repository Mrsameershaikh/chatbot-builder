import { Box, Button } from '@chakra-ui/react'
import React from 'react';
import styles from "./Dashboard.module.css";
import ReactFlow from 'reactflow';
import 'reactflow/dist/style.css';

const initialNodes = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
  { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];
 

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
              <ReactFlow nodes={initialNodes} edges={initialEdges} />
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
