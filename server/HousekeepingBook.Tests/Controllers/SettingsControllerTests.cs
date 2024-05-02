using HousekeepingBook.Controllers;
using HousekeepingBook.Entities;
using HousekeepingBook.Interfaces;
using HousekeepingBook.Models;
using Microsoft.AspNetCore.Mvc;
using Moq;

namespace HousekeepingBook.Tests.Controllers
{
    public class SettingsControllerTests
    {
        #region GetSettingsById
        [Fact]
        public void GetSettings_ReturnsOk_WithSettings()
        {
            // Arrange
            var settings = new Settings
            {
                SettingsId = 1,
                ContributionMembersCount = 1,
                PreferredColorMode = "light",
                CreateTimestamp = new DateTime(2024, 1, 15),
                UpdateTimestamp = new DateTime(2024, 2, 15),
            };
            
            var settingRepositoryMock = new Mock<ISettingRepository>();
            settingRepositoryMock.Setup(repo => repo.GetSettings())
                .Returns(() =>
                {
                    return settings;
                });

            var controller = new SettingsController(settingRepositoryMock.Object);

            // Act
            var result = controller.GetSettings();

            // Assert
            var statusCodeResult = Assert.IsType<OkObjectResult>(result);
            Assert.Equal(200, statusCodeResult.StatusCode);
            Assert.Equal(settings, statusCodeResult.Value);
        }

        [Fact]
        public void GetSettings_ReturnsNull_CreateSettings_ReturnsSettings()
        {
            // Arrange
            var settings = new Settings
            {
                SettingsId = 1,
                ContributionMembersCount = 2,
                PreferredColorMode = "light",
                CreateTimestamp = new DateTime(2024, 1, 15),
                UpdateTimestamp = new DateTime(2024, 2, 15),
            };

            var settingRepositoryMock = new Mock<ISettingRepository>();
            settingRepositoryMock.Setup(repo => repo.GetSettings())
                .Returns(() =>
                {
                    return null;
                });
            settingRepositoryMock.Setup(repo => repo.CreateSettings(It.IsAny<Settings>()))
                .Returns((Settings settings) =>
                {
                    return true;
                });

            var controller = new SettingsController(settingRepositoryMock.Object);

            // Act
            var result = controller.GetSettings();

            // Assert
            var statusCodeResult = Assert.IsType<OkObjectResult>(result);
            Assert.Equal(200, statusCodeResult.StatusCode);
        }

        [Fact]
        public void GetSettings_ReturnsNull_CreateSettings_ReturnsError()
        {
            // Arrange
            var settings = new Settings
            {
                SettingsId = 1,
                ContributionMembersCount = 2,
                PreferredColorMode = "light",
                CreateTimestamp = new DateTime(2024, 1, 15),
                UpdateTimestamp = new DateTime(2024, 2, 15),
            };

            var settingRepositoryMock = new Mock<ISettingRepository>();
            settingRepositoryMock.Setup(repo => repo.GetSettings())
                .Returns(() =>
                {
                    return null;
                });
            settingRepositoryMock.Setup(repo => repo.CreateSettings(It.IsAny<Settings>()))
                .Returns((Settings settings) =>
                {
                    return false;
                });

            var controller = new SettingsController(settingRepositoryMock.Object);

            // Act
            var result = controller.GetSettings();

            // Assert
            var statusCodeResult = Assert.IsType<ObjectResult>(result);
            Assert.Equal(500, statusCodeResult.StatusCode);
            Assert.Equal("Error occurred while executing CreateSettings", statusCodeResult.Value);

        }

        [Fact]
        public void GetSettings_ReturnsInternalError()
        {
            // Arrange
            var settingRepositoryMock = new Mock<ISettingRepository>();
            settingRepositoryMock.Setup(repo => repo.GetSettings())
                .Throws(new Exception("Simulated error"));

            var controller = new SettingsController(settingRepositoryMock.Object);
            // Act
            var result = controller.GetSettings();

            // Assert
            var statusCodeResult = Assert.IsType<ObjectResult>(result);
            Assert.Equal(500, statusCodeResult.StatusCode);
            Assert.Equal("Error occurred while executing GetSettings: Simulated error", statusCodeResult.Value);
        }
        #endregion

        #region UpdateSettings
        [Fact]
        public void UpdateSettings_ReturnsOk()
        {
            // Arrange
            var settingsRepositoryMock = new Mock<ISettingRepository>();
            settingsRepositoryMock.Setup(repo => repo.GetSettings()).Returns(() =>
            {
                return new Settings
                {
                    SettingsId = 1,
                    ContributionMembersCount = 1,
                    PreferredColorMode = "light",
                    CreateTimestamp = new DateTime(2024, 1, 15),
                    UpdateTimestamp = new DateTime(2024, 2, 15),
                };
            });

            settingsRepositoryMock.Setup(repo => repo.UpdateSettings(It.IsAny<Settings>())).Returns(true);

            var controller = new SettingsController(settingsRepositoryMock.Object);

            var model = new UpdateSettingsModel
            {
                SettingsId = 1,
                ContributionMembersCount = 5,
                PreferredColorMode = "light",
            };

            // Act
            var result = controller.UpdateSettings(model);

            // Assert
            Assert.IsType<OkResult>(result);
        }

        [Fact]
        public void UpdateSettings_ReturnsNotFound_BecauseSettingsIsNull()
        {
            // Arrange
            var settingsRepositoryMock = new Mock<ISettingRepository>();
            settingsRepositoryMock.Setup(repo => repo.GetSettings()).Returns(() =>
            {
                return null;
            });

            var controller = new SettingsController(settingsRepositoryMock.Object);

            var model = new UpdateSettingsModel
            {
                SettingsId = 1,
                ContributionMembersCount = 5,
                PreferredColorMode = "light",
            };

            // Act
            var result = controller.UpdateSettings(model);

            // Assert
            var statusCodeResult = Assert.IsType<NotFoundObjectResult>(result);
            Assert.Equal(404, statusCodeResult.StatusCode);
            Assert.Equal("No settings found for id 1", statusCodeResult.Value);
        }

        [Fact]
        public void UpdateSettings_ReturnsNotFound_BecauseSettingsIsNotUpdated()
        {
            // Arrange
            var settingsRepositoryMock = new Mock<ISettingRepository>();
            settingsRepositoryMock.Setup(repo => repo.GetSettings()).Returns(() =>
            {
                return new Settings
                {
                    SettingsId = 1,
                    ContributionMembersCount = 1,
                    PreferredColorMode = "light",
                    CreateTimestamp = new DateTime(2024, 1, 15),
                    UpdateTimestamp = new DateTime(2024, 2, 15),
                };
            });

            settingsRepositoryMock.Setup(repo => repo.UpdateSettings(It.IsAny<Settings>())).Returns(false);

            var controller = new SettingsController(settingsRepositoryMock.Object);

            var model = new UpdateSettingsModel
            {
                SettingsId = 1,
                ContributionMembersCount = 5,
                PreferredColorMode = "light",
            };

            // Act
            var result = controller.UpdateSettings(model);

            // Assert
            var statusCodeResult = Assert.IsType<NotFoundObjectResult>(result);
            Assert.Equal(404, statusCodeResult.StatusCode);
            Assert.Equal("Settings with id 1 not updated.", statusCodeResult.Value);
        }

        [Fact]
        public void UpdateSettings_ReturnsInternalError()
        {
            // Arrange
            var settingsRepositoryMock = new Mock<ISettingRepository>();
            settingsRepositoryMock.Setup(repo => repo.GetSettings()).Returns(() =>
            {
                return new Settings
                {
                    SettingsId = 1,
                    ContributionMembersCount = 1,
                    PreferredColorMode = "light",
                    CreateTimestamp = new DateTime(2024, 1, 15),
                    UpdateTimestamp = new DateTime(2024, 2, 15),
                };
            });

            settingsRepositoryMock.Setup(repo => repo.UpdateSettings(It.IsAny<Settings>())).Throws(new Exception("Simulated error"));

            var controller = new SettingsController(settingsRepositoryMock.Object);

            var model = new UpdateSettingsModel
            {
                SettingsId = 1,
                ContributionMembersCount = 5,
                PreferredColorMode = "light",
            };

            // Act
            var result = controller.UpdateSettings(model);

            // Assert
            var statusCodeResult = Assert.IsType<ObjectResult>(result);
            Assert.Equal(500, statusCodeResult.StatusCode);
            Assert.Equal("Error occurred while executing UpdateSettings: Simulated error", statusCodeResult.Value);
        }
        #endregion
    }
}
