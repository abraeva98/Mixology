var AWS = require("aws-sdk");
const {accessKeyId,secretAccessKey} = require('../secrets')
let awsConfig = {
  region: "us-east-2",
  endpoint: "http://dynamodb.us-east-2.amazonaws.com",
  accessKeyId,
  secretAccessKey
};
AWS.config.update(awsConfig);

const DynamoDB = new AWS.DynamoDB();

async function createTable() {
  const params = {
    TableName: "Users",
    KeySchema: [
      { AttributeName: "id", KeyType: "HASH" },
    ],
    AttributeDefinitions: [
      { AttributeName: "id", AttributeType: "N" },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 10,
      WriteCapacityUnits: 10,
    },
  };
  return await DynamoDB.createTable(params).promise();
}

async function addItem(id, userName, firstName, lastName, ingredient) {
  const params = {
    TableName: "Users",
    Item: {
      id: { N: id },
      userName: { S: userName },
      firstName: { S: firstName },
      lastName: { S: lastName },
      ingredients: {
          L: //L -array
                    ingredient.map(item => {
                        return {
                            M: {
                                  name: {S: item.name},
                                  image: {S: item.image}
                            }
                        }
                    }
                  )
                }
    },
  };
  
  return await DynamoDB.putItem(params).promise();
}

(async () => {
    console.log(
        "the func call",
        await addItem(
            "2",
            "anna_96",
            "Anna",
            "Rzh",
            [{name: 'vodka', image: "bhfbejcnej"}, {name: 'rum', image: "bhfbejcnej"}, {name: 'rum',image:"bhfbejcnej"}]
            )
            );
        })();
 