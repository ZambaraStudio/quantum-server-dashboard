


// import { Service } from "typedi";
// import { v4 as uuidv4 } from "uuid"; // For generating unique game instance IDs
// import { GameInstanceType, InitialStateType } from "./game_instance.types";
// import { RedisService } from "../redis/redis.service";

// @Service()
// export class GameInstanceService {
//   constructor(
//     private readonly redisService: RedisService // Inject RedisService
//   ) {}

//   async createGameInstance(
//     initialInput: string[], // Ensure initialInput is an array of strings
//     initialState: InitialStateType // Ensure initialState uses the custom type
//   ): Promise<string> {
//     const timestamp = Date.now();
//     const gameInstanceId = uuidv4(); // Generate a unique ID for the game instance

//     const gameInstance: GameInstanceType = {
//       initialInput,
//       initialState,
//       timestamp,
//     };

//     // Store the game instance in Redis with the unique ID
//     await this.redisService.redisClient.set(
//       `game_instance:${gameInstanceId}`, // Use a key prefix like 'game_instance:'
//       JSON.stringify(gameInstance) // Store the game instance as a JSON string
//     );

//     console.log(gameInstance)

//     return gameInstanceId; // Return the unique ID for reference
//   }

//   async getGameInstance(gameInstanceId: string): Promise<GameInstanceType | null> {
//     const gameInstanceData = await this.redisService.redisClient.get(`game_instance:${gameInstanceId}`);
    
//     if (!gameInstanceData) {
//       return null; // Return null if no game instance is found
//     }

//     return JSON.parse(gameInstanceData) as GameInstanceType; // Deserialize and return the game instance
//   }



//   async getAllGameInstances(): Promise<any[]> {
//     // Retrieve all game instances
//     const keys = await this.redisService.redisClient.keys("game_instance:*");
//     const gameInstancesResponse = await this.redisService.redisClient.mGet(keys);
//     const gameInstances  =gameInstancesResponse.map((value,index)=>{
//       const key = keys[index];
//       if(!key || !value){
//         return undefined;
//       }
//       const gameInstance = {
//         ...JSON.parse(value),
//         id: key
//       }
//       return gameInstance;
//     }).filter(val => val) 
//     return gameInstances;
//   }
  


//   async deleteGameInstance(gameInstanceId: string): Promise<boolean> {
//     const key = `game_instance:${gameInstanceId}`; // Match the key format used in create
//     const result = await this.redisService.redisClient.del(key); // Delete the key from Redis

//     return result === 1; // Return true if the instance was deleted, false otherwise
//   }



// }


import { Service } from "typedi";
import { v4 as uuidv4 } from "uuid";
import { GameInstanceType } from "./game-instance.types"; 
import { RedisService } from "../redis/redis.service";


@Service()
export class GameInstanceService {
  constructor(
    private readonly redisService: RedisService 
  ) {}

  async createGameInstance(gameInstanceData: GameInstanceType){
    const gameInstanceId = gameInstanceData.id!; 

    const timestamp = Date.now(); 
    const gameInstance: GameInstanceType = {
      id: gameInstanceData.id, 
      state: "{}",
      updated: timestamp, 
    };

    await this.redisService.redisClient.hSet(
      `${gameInstanceId}:game_instance`, 
      {
        ...gameInstance
      }
     
    );

    console.log(gameInstance);

   const d = await this.redisService.redisClient.zAdd('updated_game_instances', 
    {
      score: timestamp,
      value: `${gameInstanceId}:game_instance`
    }
    );

    console.log(d,"BABAIAGA")

    return gameInstanceId; 
  }

  async getGameInstance(gameInstanceId: string): Promise<GameInstanceType | null> {
    const gameInstanceData = await this.redisService.redisClient.get(`${gameInstanceId}:game_instance`);
    
    if (!gameInstanceData) {
      return null; 
    }

    return JSON.parse(gameInstanceData) as GameInstanceType; 
  }

  async getAllGameInstances(): Promise<GameInstanceType[]> {

    // await this.redisService.redisClient.flushDb();

    // Retrieve all game instances
    //const keys = await this.redisService.redisClient.keys("game_instance:*");

    const keys = await this.redisService.redisClient.zRange("updated_game_instances", 0, 20);


    if(!keys.length){
      console.log("HERE1111!")

      return [];

    }


    const results: GameInstanceType[] = [];

    // Loop through the keys and get their hashes
    for (const key of keys) {
        const hash = await this.redisService.redisClient.hGetAll(key);
        results.push(hash); // Store the hash with the key
    }

    console.log(results, keys);
    return results;

    const gameInstancesResponse = await this.redisService.redisClient.mGet(keys);
    console.log(gameInstancesResponse)
    
    if(!gameInstancesResponse){
      return [];
    }
    
    const gameInstances = gameInstancesResponse.map((value, index) => {
      const key = keys[index];
      if (!key || !value) {
        return undefined;
      }
      const gameInstance = {
        ...JSON.parse(value),
      };
      return gameInstance;
    }).filter(val => val) as GameInstanceType[];

    // console.log(keys,11111111)
    // console.log(gameInstancesResponse,2222222)
    // console.log(gameInstances,3333333)

    return gameInstances; 
  }

  async deleteGameInstance(gameInstanceId: string): Promise<boolean> {
    const key = `${gameInstanceId}:game_instance`; 
    const result = await this.redisService.redisClient.del(key); 

    return result === 1;
  }






}