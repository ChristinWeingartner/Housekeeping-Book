using HousekeepingBook.DbContexts;
using HousekeepingBook.Entities;
using HousekeepingBook.Interfaces;

namespace HousekeepingBook.Repositories
{
    public class SQLSettingRepository : ISettingRepository
    {
        private readonly DataContext context;

        public SQLSettingRepository(DataContext context)
        {
            this.context = context;
        }

        public Settings? GetSettings()
        {
            var settings = context.Settings.FirstOrDefault();
            return settings;
        }

        public bool UpdateSettings(Settings model)
        {
            var settings = context.Settings.FirstOrDefault();
            int affectedRows = 0;
            if (settings != null && model.ContributionMembersCount != 0)
            {
                settings.ContributionMembersCount = model.ContributionMembersCount;
                settings.PreferredColorMode = model.PreferredColorMode;
                settings.UpdateTimestamp = model.UpdateTimestamp;
                affectedRows = context.SaveChanges();
            }
            return affectedRows > 0; // Returns true if at least one row was affected.
        }

        public bool CreateSettings(Settings model)
        {
            bool settingsExists = context.Settings.Any(s => s.SettingsId == model.SettingsId);
            int affectedRows = 0;

            if(!settingsExists)
            {
                context.Settings.Add(model);
                affectedRows = context.SaveChanges();
            }

            return affectedRows > 0; // Returns true if at least one row was affected.
        }
    }
}
