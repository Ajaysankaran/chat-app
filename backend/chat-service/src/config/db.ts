import * as driver from 'cassandra-driver'
import { CASSANDRA_CONTACT_POINTS, CASSANDRA_PASSWORD, CASSANDRA_USER } from './config'
import { logger } from './logger';

const authProvider = new driver.auth.PlainTextAuthProvider(CASSANDRA_USER, CASSANDRA_PASSWORD);

const cassandraClient = new driver.Client({
    contactPoints: [CASSANDRA_CONTACT_POINTS],
    authProvider: authProvider,
    localDataCenter: 'datacenter1'
})


// cassandraClient.on('log', (level, className, message, furtherInfo) => {
//     logger.info(message);
// });

export default cassandraClient
