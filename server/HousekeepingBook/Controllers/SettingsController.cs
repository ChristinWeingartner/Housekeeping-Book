using HousekeepingBook.Entities;
using HousekeepingBook.Interfaces;
using HousekeepingBook.Models;
using Microsoft.AspNetCore.Mvc;

namespace HousekeepingBook.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SettingsController : ControllerBase
    {
        private readonly ISettingRepository _settingRepository;

        public SettingsController(ISettingRepository settingRepository)
        {
            _settingRepository = settingRepository;
        }

        [HttpPost("getSettings")]
        public IActionResult GetSettings()
        {
            try
            {
                Settings? settings = _settingRepository.GetSettings();
                if (settings == null)
                {
                    // create default settings if database is empty
                    settings = new Settings
                    {
                        CreateTimestamp = DateTime.Now,
                        UpdateTimestamp = DateTime.Now,
                        PreferredColorMode = "light",
                        ContributionMembersCount = 2
                    };
                 
                    bool settingsCreated = _settingRepository.CreateSettings(settings);

                    return settingsCreated ? Ok(settings) : StatusCode(500, "Error occurred while executing CreateSettings");
                }

                return Ok(settings);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Error occurred while executing GetSettings: " + ex.Message);
            }
        }

        [HttpPut("updateSettings")]
        public IActionResult UpdateSettings([FromBody] UpdateSettingsModel model)
        {
            try
            {
                Settings? oldSettings = _settingRepository.GetSettings();
                if (oldSettings == null)
                {
                    return NotFound($"No settings found for id {model.SettingsId}");
                }

                Settings newModel = new Settings()
                {
                    SettingsId = model.SettingsId,
                    ContributionMembersCount = model.ContributionMembersCount,
                    PreferredColorMode = model.PreferredColorMode,
                    CreateTimestamp = oldSettings.CreateTimestamp,
                    UpdateTimestamp = DateTime.Now,
                };

                bool settingsUpdated = _settingRepository.UpdateSettings(newModel);

                return settingsUpdated ? Ok() : NotFound($"Settings with id {model.SettingsId} not updated.");

            }
            catch (Exception ex)
            {
                return StatusCode(500, "Error occurred while executing UpdateSettings: " + ex.Message);
            }
        }
    }
}
