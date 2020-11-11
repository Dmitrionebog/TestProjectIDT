CREATE DATABASE IDTDatabase;
GO
USE [IDTDatabase];

	CREATE TABLE [dbo].[Records](
	[Id] [int] NOT NULL PRIMARY KEY,
	[Type] [nvarchar](50) NOT NULL,
	[Value] [nvarchar](50) NOT NULL);

	INSERT INTO [Records] (Id, Type, Value)
	VALUES (1, 'actors', 'developer');

	INSERT INTO [Records] (Id, Type, Value)
	VALUES (2, 'actors', 'astronaut');

	INSERT INTO [Records] (Id, Type, Value)
	VALUES (3, 'actors', 'president');

	INSERT INTO [Records] (Id, Type, Value)
	VALUES (4, 'actions', 'shoot');

	INSERT INTO [Records] (Id, Type, Value)
	VALUES (5, 'actions', 'jump');

	INSERT INTO [Records] (Id, Type, Value)
	VALUES (6, 'actions', 'eat');

	INSERT INTO [Records] (Id, Type, Value)
	VALUES (7, 'additions', 'frogs with a laser gun');

	INSERT INTO [Records] (Id, Type, Value)
	VALUES (8, 'additions', 'from space');

	INSERT INTO [Records] (Id, Type, Value)
	VALUES (9, 'additions', 'on car');

