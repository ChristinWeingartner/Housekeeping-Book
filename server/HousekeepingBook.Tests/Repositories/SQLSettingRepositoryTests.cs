using HousekeepingBook.DbContexts;
using HousekeepingBook.Entities;
using Microsoft.EntityFrameworkCore;
using HousekeepingBook.Repositories;

namespace HousekeepingBook.Tests.Repositories
{
    public class SQLSettingRepositoryTests
    {
        private readonly DataContext context;

        public SQLSettingRepositoryTests()
        {
            DbContextOptionsBuilder dbOptions = new DbContextOptionsBuilder<DataContext>()
                .UseInMemoryDatabase(
                Guid.NewGuid().ToString());
            context = new DataContext((DbContextOptions<DataContext>)dbOptions.Options);
        }

        #region GetSettings
        [Fact]
        public void GetSettings_ShouldGetCorrectSettings()
        {
            // Arrange
            var options = new DbContextOptionsBuilder<DataContext>()
                .UseInMemoryDatabase(databaseName: "GetSettings_ShouldGetCorrectSettings")
                .Options;

            var initialSettings = new Settings
            {
                SettingsId = 1,
                ContributionMembersCount = 1,
                PreferredColorMode = "light",
                CreateTimestamp = new DateTime(2024, 1, 15),
                UpdateTimestamp = new DateTime(2024, 2, 15),
            };

            using (var initialContext = new DataContext(options))
            {
                // Add settings
                initialContext.Settings.Add(initialSettings);
                initialContext.SaveChanges();
            }

            using (var context = new DataContext(options))
            {
                var sut = new SQLSettingRepository(context);

                // Act
                Settings? result = sut.GetSettings();

                // Assert
                Assert.Equal(result?.SettingsId, initialSettings.SettingsId);
            }
        }

        [Fact]
        public void GetSettings_ShouldGetNull()
        {
            // Arrange
            var options = new DbContextOptionsBuilder<DataContext>()
                .UseInMemoryDatabase(databaseName: "GetSettings_ShouldGetNull")
                .Options;

            using (var context = new DataContext(options))
            {
                var sut = new SQLSettingRepository(context);

                // Act
                Settings? result = sut.GetSettings();

                // Assert
                Assert.Null(result);
            }
        }
        #endregion

        #region UpdateSettings
        [Fact]
        public void UpdateSettings_ShouldUpdateSettings()
        {
            // Arrange
            var options = new DbContextOptionsBuilder<DataContext>()
                .UseInMemoryDatabase(databaseName: "UpdateSettings_ShouldUpdateSettings")
                .Options;

            using (var initialContext = new DataContext(options))
            {
                // Add an initial settings
                var initialSettings1 = new Settings
                {
                    SettingsId = 1,
                    ContributionMembersCount = 1,
                    PreferredColorMode = "light",
                    CreateTimestamp = new DateTime(2024, 1, 15),
                    UpdateTimestamp = new DateTime(2024, 2, 15),
                };
                var initialSettings2 = new Settings
                {
                    SettingsId = 2,
                    ContributionMembersCount = 6,
                    PreferredColorMode = "light",
                    CreateTimestamp = new DateTime(2024, 1, 15),
                    UpdateTimestamp = new DateTime(2024, 2, 15),
                };

                initialContext.Settings.Add(initialSettings1);
                initialContext.Settings.Add(initialSettings2);
                initialContext.SaveChanges();
            }

            using (var context = new DataContext(options))
            {
                var sut = new SQLSettingRepository(context);

                Settings newModel = new Settings()
                {
                    SettingsId = 1,
                    ContributionMembersCount = 9,
                    PreferredColorMode = "light",
                    CreateTimestamp = new DateTime(2024, 1, 15),
                    UpdateTimestamp = new DateTime(2024, 2, 18),
                };

                // Act
                bool result = sut.UpdateSettings(newModel);

                // Assert
                Assert.True(result);
                List<Settings> settings = context.Settings.ToList();
                Assert.Equal(2, settings.Count());
                Assert.Equal(newModel.SettingsId, settings[0].SettingsId);
                Assert.Equal(newModel.ContributionMembersCount, settings[0].ContributionMembersCount);
                Assert.Equal(newModel.PreferredColorMode, settings[0].PreferredColorMode);
                Assert.Equal(newModel.UpdateTimestamp, settings[0].UpdateTimestamp);
            }
        }

        [Fact]
        public void UpdateSettings_ShouldNotUpdateSettings()
        {
            // Arrange
            var options = new DbContextOptionsBuilder<DataContext>()
                .UseInMemoryDatabase(databaseName: "UpdateSettings_ShouldNotUpdateSettings")
                .Options;

            using (var context = new DataContext(options))
            {
                var sut = new SQLSettingRepository(context);

                Settings newModel = new Settings()
                {
                    SettingsId = 3,
                    ContributionMembersCount = 9,
                    PreferredColorMode = "dark",
                    CreateTimestamp = new DateTime(2024, 1, 15),
                    UpdateTimestamp = new DateTime(2024, 2, 18),
                };

                // Act
                bool result = sut.UpdateSettings(newModel);

                // Assert
                Assert.False(result);
                List<Settings> settings = context.Settings.ToList();
                Assert.Empty(settings);
            }
        }

        [Fact]
        public void UpdateSettings_ShouldNotUpdateSettings_Because_Count_Is_0()
        {
            // Arrange
            var options = new DbContextOptionsBuilder<DataContext>()
                .UseInMemoryDatabase(databaseName: "UpdateSettings_ShouldNotUpdateSettings_Because_Count_Is_0")
                .Options;

            using (var initialContext = new DataContext(options))
            {
                // Add an initial settings
                var initialSettings1 = new Settings
                {
                    SettingsId = 1,
                    ContributionMembersCount = 1,
                    PreferredColorMode = "light",
                    CreateTimestamp = new DateTime(2024, 1, 15),
                    UpdateTimestamp = new DateTime(2024, 2, 15),
                };
                var initialSettings2 = new Settings
                {
                    SettingsId = 2,
                    ContributionMembersCount = 6,
                    PreferredColorMode = "light",
                    CreateTimestamp = new DateTime(2024, 1, 15),
                    UpdateTimestamp = new DateTime(2024, 2, 15),
                };

                initialContext.Settings.Add(initialSettings1);
                initialContext.Settings.Add(initialSettings2);
                initialContext.SaveChanges();
            }

            using (var context = new DataContext(options))
            {
                var sut = new SQLSettingRepository(context);

                Settings newModel = new Settings()
                {
                    SettingsId = 1,
                    ContributionMembersCount = 0,
                    PreferredColorMode = "dark",
                    CreateTimestamp = new DateTime(2024, 1, 15),
                    UpdateTimestamp = new DateTime(2024, 2, 18),
                };

                // Act
                bool result = sut.UpdateSettings(newModel);

                // Assert
                Assert.False(result);
                List<Settings> settings = context.Settings.ToList();
                Assert.Equal(2, settings.Count());
                Assert.Equal(newModel.SettingsId, settings[0].SettingsId);
                Assert.NotEqual(newModel.ContributionMembersCount, settings[0].ContributionMembersCount);
                Assert.NotEqual(newModel.PreferredColorMode, settings[0].PreferredColorMode);
                Assert.NotEqual(newModel.UpdateTimestamp, settings[0].UpdateTimestamp);
            }
        }
        #endregion

        #region CreateSettings
        [Fact]
        public void CreateSettings_ShouldCreateSettings()
        {
            // Arrange
            var options = new DbContextOptionsBuilder<DataContext>()
                .UseInMemoryDatabase(databaseName: "CreateSettings_ShouldCreateSettings")
                .Options;

            using (var context = new DataContext(options))
            {
                var sut = new SQLSettingRepository(context);

                Settings newModel = new Settings
                {
                    SettingsId = 1,
                    CreateTimestamp = new DateTime(2024, 1, 15),
                    UpdateTimestamp = new DateTime(2024, 1, 15),
                    PreferredColorMode = "light",
                    ContributionMembersCount = 2
                };

                // Act
                bool result = sut.CreateSettings(newModel);

                // Assert
                Assert.True(result);
            }
        }
        [Fact]
        public void CreateSettings_ShouldNotCreateSettingsBecauseIdIsUsed()
        {
            // Arrange
            var options = new DbContextOptionsBuilder<DataContext>()
                .UseInMemoryDatabase(databaseName: "CreateSettings_ShouldNotCreateSettingsBecauseIdIsUsed")
                .Options;

            using (var initialContext = new DataContext(options))
            {
                // Add an initial settings
                var initialSettings1 = new Settings
                {
                    SettingsId = 1,
                    ContributionMembersCount = 1,
                    PreferredColorMode = "light",
                    CreateTimestamp = new DateTime(2024, 1, 15),
                    UpdateTimestamp = new DateTime(2024, 2, 15),
                };
                var initialSettings2 = new Settings
                {
                    SettingsId = 2,
                    ContributionMembersCount = 6,
                    PreferredColorMode = "light",
                    CreateTimestamp = new DateTime(2024, 1, 15),
                    UpdateTimestamp = new DateTime(2024, 2, 15),
                };

                initialContext.Settings.Add(initialSettings1);
                initialContext.Settings.Add(initialSettings2);
                initialContext.SaveChanges();
            }

            using (var context = new DataContext(options))
            {
                var sut = new SQLSettingRepository(context);

                Settings newModel = new Settings
                {
                    SettingsId = 1,
                    CreateTimestamp = new DateTime(2024, 1, 15),
                    UpdateTimestamp = new DateTime(2024, 1, 15),
                    PreferredColorMode = "light",
                    ContributionMembersCount = 2
                };

                // Act
                bool result = sut.CreateSettings(newModel);

                // Assert
                Assert.False(result);
            }
        }
        #endregion
    }
}
