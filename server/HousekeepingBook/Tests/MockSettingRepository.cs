using HousekeepingBook.Entities;
using HousekeepingBook.Interfaces;

namespace HousekeepingBook.Tests
{
    public class MockSettingRepository : ISettingRepository
    {

        private List<Settings> _settings;

        public MockSettingRepository() 
        { 
            _settings = new List<Settings>()
            {
                new Settings() { SettingsId = 1, ContributionMembersCount = 2, PreferredColorMode = "light", CreateTimestamp= new DateTime(), UpdateTimestamp = new DateTime() },
                new Settings() { SettingsId = 2, ContributionMembersCount = 4, PreferredColorMode = "dark", CreateTimestamp= new DateTime(), UpdateTimestamp = new DateTime() },
                new Settings() { SettingsId = 3, ContributionMembersCount = 5, PreferredColorMode = "light", CreateTimestamp= new DateTime(), UpdateTimestamp = new DateTime() },
            };
        }

        public bool CreateSettings(Settings model)
        {
            throw new NotImplementedException();
        }

        public Settings? GetSettings()
        {
            throw new NotImplementedException();
        }

        public bool UpdateSettings(Settings model)
        {
            throw new NotImplementedException();
        }
    }
}
