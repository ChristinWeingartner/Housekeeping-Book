using HousekeepingBook.Entities;

namespace HousekeepingBook.Interfaces
{
    public interface ISettingRepository
    {
        bool CreateSettings(Settings model);
        Settings? GetSettings();
        bool UpdateSettings(Settings model);
    }
}
