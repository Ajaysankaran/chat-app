create keyspace chat_app;

create table chat_app.conversations (
   conversation_id uuid,
   user_id uuid,
   PRIMARY KEY (user_id, conversation_id)
);

create table chat_app.messages (
   message_id uuid,
   conversation_id uuid,
   sender_id uuid,
   content text,
   created_date timestamp,
   PRIMARY KEY ((conversation_id, message_id), created_date))
WITH CLUSTERING ORDER BY (created_date ASC);