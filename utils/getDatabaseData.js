const { TennisSchema } = require("../schema");

module.exports.GetDatabaseData = async () => {
  const data = await TennisSchema.find({}, async (err, collection) => {
    return collection;
  });
  console.log(data);
  return data;
};
