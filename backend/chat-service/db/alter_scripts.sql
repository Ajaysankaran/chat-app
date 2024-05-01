create keyspace chat_app;

create table chat_app.conversations (  
   conversation_id uuid,
   sender_id uuid,
   receiver_id uuid,
   PRIMARY KEY (sender_id, receiver_id)
);


create table chat_app.messages (
   conversation_id uuid,
   message_id uuid,
   sender_id uuid,
   content text,
   created_timestamp timestamp,
   PRIMARY KEY (conversation_id, created_timestamp))
WITH CLUSTERING ORDER BY (created_timestamp DESC);

