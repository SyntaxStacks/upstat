# Description:
#   Opon-style
#
# Dependencies:
#   None
#
# Configuration:
#   curl -X POST -d '{"username": "juan", "password": "mysupercoolusername", "passwordConfirm": "password"}' -H "Content-Type: application/json" http://localhost:3000/user/
#
# Commands:
#   todo: 
#
# Author:
#   juanito

url  = 'http://opon.tld'

module.exports = (robot) ->
# User Commands
  robot.hear /opon userlist/i, (msg) ->
    robot.http("#{url}/user/")
      .header('Accept', 'application/json')
      .get() (err, res, body) ->
        for line in JSON.parse(body)
          msg.send "id: #{line._id},  name: #{line.username}"

  robot.hear /opon userdelete (.*)/i, (msg) ->
    userid = msg.match[1]
    robot.http("#{url}/user/#{userid}")
      .header('Accept', 'application/json')
      .delete() (err, res, body) ->
        msg.send "#{body}"

#  robot.hear /opon createuser user=(.*) password=(.*)/i, (msg) ->
#    username = msg.match[1]
#    password = msg.match[2]
#    data = { "username": "#{username}", "password": "#{password}",
#           "passwordConfirm", "#{password}"}
#    robot.http("#{url}/user/")
#      .header('Accept', 'application/json')
#      .post(data) (err, res, body) ->
#        msg.send "#{body}"

# Team Commands
  robot.hear /opon teamlist/i, (msg) ->                                            
    robot.http("#{url}/team/")                                                  
      .header('Accept', 'application/json')                                     
      .get() (err, res, body) ->                                                
        msg.send "#{body}"

  robot.hear /opon teamdetail (.*)/i, (msg) ->
    teamid = msg.match[1]                                         
    robot.http("#{url}/team/:#{teamid}")                                                  
      .header('Accept', 'application/json')                                     
      .get() (err, res, body) ->                                                
        msg.send "#{body}"

# Status Commands
  robot.hear /opon allstatus/i, (msg) ->                                         
    robot.http("#{url}/status/")                                                  
      .header('Accept', 'application/json')                                     
      .get() (err, res, body) ->                                                
        msg.send "#{body}"

#Help Commands
  robot.hear /opon (listcommands|help)/i, (msg) ->
    msg.send "opon userlist"
    msg.send "opon teamlist"
    msg.send "opon userdelete <id>"
    msg.send "opon createuser username=<name> password=<password"
    msg.send "opon teamdetail <id>"
    msg.send "opon allstatus"
