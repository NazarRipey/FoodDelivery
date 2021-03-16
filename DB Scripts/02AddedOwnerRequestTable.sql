USE [FoodDelivery]
GO

/****** Object:  Table [dbo].[RestaurantOwnerRequest]    Script Date: 3/16/2021 5:07:09 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[RestaurantOwnerRequest](
	[Id] [uniqueidentifier] NOT NULL,
	[UserProfileId] [uniqueidentifier] NOT NULL,
	[CreatedDate] [date] NOT NULL,
	[ClosedDate] [date] NULL,
	[Status] [int] NOT NULL,
 CONSTRAINT [PK_OwnerRequest] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[RestaurantOwnerRequest]  WITH CHECK ADD  CONSTRAINT [FK_RestaurantOwnerRequest_UserProfile] FOREIGN KEY([UserProfileId])
REFERENCES [dbo].[UserProfile] ([Id])
GO

ALTER TABLE [dbo].[RestaurantOwnerRequest] CHECK CONSTRAINT [FK_RestaurantOwnerRequest_UserProfile]
GO


