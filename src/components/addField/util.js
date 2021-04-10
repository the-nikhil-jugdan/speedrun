export const sequelize_db_types = new Map()

const dt_arr = [
  ['DataTypes.STRING', 'String'],
  ['DataTypes.STRING.BINARY', 'Binary String'],
  ['DataTypes.TEXT', 'Text'],
  ['DataTypes.BOOLEAN', 'Boolean'],
  ['DataTypes.INTEGER', 'Integer'],
  ['DataTypes.BIGINT', 'Big Integer'],
  ['DataTypes.FLOAT', 'Float'],
  ['DataTypes.REAL', 'Real'],
  ['DataTypes.DOUBLE', 'Double'],
  ['DataTypes.DECIMAL', 'Decimal'],
  ['DataTypes.INTEGER.UNSIGNED', 'Unsigned Integer'],
  ['DataTypes.INTEGER.ZEROFILL', 'Integer 0s'],
  ['DataTypes.INTEGER.UNSIGNED.ZEROFILL', 'Integer 1s'],
  ['DataTypes.DATE', 'Date and Time'],
  ['DataTypes.DATEONLY', 'Date Only'],
  ['DataTypes.UUID', 'UUID']
]

dt_arr.forEach((arr) => {
  sequelize_db_types.set(arr[0],arr[1])
})
