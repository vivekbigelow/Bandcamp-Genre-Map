
// //Postgresql command line commands to start and stop local DB Server
// //pg_ctl -D /usr/local/var/postgres start
// //pg_ctl -D /usr/local/var/postgres stop

// import { Location } from './entities/Location';
// import { Genre } from './entities/Genre';
// //import { Album } from './entities/Album';
// import {__prod__} from "./constants";
// import {MikroORM} from '@mikro-orm/core';
// import path from 'path';



// export default {
//     migrations: {
//         path: path.join(__dirname,'./migrations'), // path to the folder with migrations
//         pattern: /^[\w-]+\d+\.[tj]s$/,
//     },
//     entities: [Location,Genre],
//     dbName: 'bandcamp',
//     user: 'Vivek',
//     type: 'postgresql',
//     debug: !__prod__,
// } as Parameters<typeof MikroORM.init>[0]; 