using HousekeepingBook.Controllers;
using HousekeepingBook.Entities;
using HousekeepingBook.Interfaces;
using HousekeepingBook.Models;
using Microsoft.AspNetCore.Mvc;
using Moq;

namespace HousekeepingBook.Tests.Controllers
{
    public class InvoicesControllerTests
    {
        #region DeleteInvoiceById
        [Fact]
        public void DeleteInvoiceById_ReturnsOk()
        {
            // Arrange
            var invoiceRepositoryMock = new Mock<IInvoiceRepository>();
            invoiceRepositoryMock.Setup(repo => repo.DeleteInvoiceById(It.IsAny<int>())).Returns(true);

            var monthlyInvoiceSummaryRepositoryMock = new Mock<IMonthlyInvoiceSummaryRepository>();

            var controller = new InvoicesController(invoiceRepositoryMock.Object, monthlyInvoiceSummaryRepositoryMock.Object);

            var id = 1;

            // Act
            var result = controller.DeleteInvoiceById(id);

            // Assert
            Assert.IsType<OkResult>(result);
        }

        [Fact]
        public void DeleteInvoiceById_ReturnsNotFound()
        {
            // Arrange
            var invoiceRepositoryMock = new Mock<IInvoiceRepository>();
            invoiceRepositoryMock.Setup(repo => repo.DeleteInvoiceById(It.IsAny<int>())).Returns(false);

            var monthlyInvoiceSummaryRepositoryMock = new Mock<IMonthlyInvoiceSummaryRepository>();

            var controller = new InvoicesController(invoiceRepositoryMock.Object, monthlyInvoiceSummaryRepositoryMock.Object);

            var id = 19;

            // Act
            var result = controller.DeleteInvoiceById(id);

            // Assert
            var statusCodeResult = Assert.IsType<NotFoundObjectResult>(result);
            Assert.Equal(404, statusCodeResult.StatusCode);
            Assert.Equal("Invoice with id 19 not deleted.", statusCodeResult.Value);

        }

        [Fact]
        public void DeleteInvoiceById_ReturnsInternalError()
        {
            // Arrange
            var invoiceRepositoryMock = new Mock<IInvoiceRepository>();
            invoiceRepositoryMock.Setup(repo => repo.DeleteInvoiceById(It.IsAny<int>())).Throws(new Exception("Simulated error"));

            var monthlyInvoiceSummaryRepositoryMock = new Mock<IMonthlyInvoiceSummaryRepository>();

            var controller = new InvoicesController(invoiceRepositoryMock.Object, monthlyInvoiceSummaryRepositoryMock.Object);

            var id = 19;

            // Act
            var result = controller.DeleteInvoiceById(id);

            // Assert
            var statusCodeResult = Assert.IsType<ObjectResult>(result);
            Assert.Equal(500, statusCodeResult.StatusCode);
            Assert.Equal("Error occurred while executing DeleteInvoiceById: Simulated error", statusCodeResult.Value);
        }
        #endregion

        #region UpdateCommentByMonthAndYear
        [Fact]
        public void UpdateCommentByMonthAndYear_ReturnsOk()
        {
            // Arrange
            var invoiceRepositoryMock = new Mock<IInvoiceRepository>();

            var monthlyInvoiceSummaryRepositoryMock = new Mock<IMonthlyInvoiceSummaryRepository>();
            monthlyInvoiceSummaryRepositoryMock.Setup(repo => repo.GetMonthlyInvoiceSummaryId(It.IsAny<int>(), It.IsAny<string>()))
                .Returns((int month, string year) =>
                {
                    return 1;
                });

            monthlyInvoiceSummaryRepositoryMock
                .Setup(repo => repo.UpdateComment(It.IsAny<int>(), It.IsAny<string>()))
                .Returns((int id, string comment) =>
                {
                    return true;
                });
            monthlyInvoiceSummaryRepositoryMock.Setup(repo => repo.GetCommentByMonthlyInvoiceSummaryId(It.IsAny<int>())).Returns("this is the updated comment");

            var controller = new InvoicesController(invoiceRepositoryMock.Object, monthlyInvoiceSummaryRepositoryMock.Object);

            var model = new UpdateCommentByMonthAndYearModel
            {
                Month = 1,
                Year = "2024",
                Comment = "this is the updated comment"
            };

            // Act
            var result = controller.UpdateCommentByMonthAndYear(model);

            // Assert
            var statusCodeResult = Assert.IsType<OkObjectResult>(result);
            Assert.Equal(200, statusCodeResult.StatusCode);
            Assert.Equal("this is the updated comment", statusCodeResult.Value);
        }

        [Fact]
        public void UpdateCommentByMonthAndYear_ReturnsNotFound_BecauseIdIsWrong()
        {
            // Arrange
            var invoiceRepositoryMock = new Mock<IInvoiceRepository>();

            var monthlyInvoiceSummaryRepositoryMock = new Mock<IMonthlyInvoiceSummaryRepository>();
            monthlyInvoiceSummaryRepositoryMock.Setup(repo => repo.GetMonthlyInvoiceSummaryId(It.IsAny<int>(), It.IsAny<string>()))
                .Returns((int month, string year) =>
                {
                    return 0;
                });

            monthlyInvoiceSummaryRepositoryMock
                .Setup(repo => repo.UpdateComment(It.IsAny<int>(), It.IsAny<string>()))
                .Returns((int id, string comment) =>
                {
                    return false;
                });

            var controller = new InvoicesController(invoiceRepositoryMock.Object, monthlyInvoiceSummaryRepositoryMock.Object);

            var model = new UpdateCommentByMonthAndYearModel
            {
                Month = 1,
                Year = "2024",
                Comment = "new comment"
            };

            // Act
            var result = controller.UpdateCommentByMonthAndYear(model);

            // Assert
            var statusCodeResult = Assert.IsType<NotFoundObjectResult>(result);
            Assert.Equal(404, statusCodeResult.StatusCode);
            Assert.Equal("No MonthlyInvoiceSummary found for month 1 and year 2024", statusCodeResult.Value);
        }

        [Fact]
        public void UpdateCommentByMonthAndYear_ReturnsNotFound_BecauseCommentNotUpdated()
        {
            // Arrange
            var invoiceRepositoryMock = new Mock<IInvoiceRepository>();

            var monthlyInvoiceSummaryRepositoryMock = new Mock<IMonthlyInvoiceSummaryRepository>();
            monthlyInvoiceSummaryRepositoryMock.Setup(repo => repo.GetMonthlyInvoiceSummaryId(It.IsAny<int>(), It.IsAny<string>()))
                .Returns((int month, string year) =>
                {
                    return 1;
                });

            monthlyInvoiceSummaryRepositoryMock
                .Setup(repo => repo.UpdateComment(It.IsAny<int>(), It.IsAny<string>()))
                .Returns((int id, string comment) =>
                {
                    return false;
                });

            var controller = new InvoicesController(invoiceRepositoryMock.Object, monthlyInvoiceSummaryRepositoryMock.Object);

            var model = new UpdateCommentByMonthAndYearModel
            {
                Month = 1,
                Year = "2024",
                Comment = "new comment"
            };

            // Act
            var result = controller.UpdateCommentByMonthAndYear(model);

            // Assert
            var statusCodeResult = Assert.IsType<NotFoundObjectResult>(result);
            Assert.Equal(404, statusCodeResult.StatusCode);
            Assert.Equal($"Comment for month {model.Month} and year {model.Year} not updated.", statusCodeResult.Value);
        }

        [Fact]
        public void UpdateCommentByMonthAndYear_ReturnsInternalError()
        {
            // Arrange
            var invoiceRepositoryMock = new Mock<IInvoiceRepository>();

            var monthlyInvoiceSummaryRepositoryMock = new Mock<IMonthlyInvoiceSummaryRepository>();
            monthlyInvoiceSummaryRepositoryMock.Setup(repo => repo.GetMonthlyInvoiceSummaryId(It.IsAny<int>(), It.IsAny<string>()))
                .Throws(new Exception("Simulated error"));

            monthlyInvoiceSummaryRepositoryMock
                .Setup(repo => repo.UpdateComment(It.IsAny<int>(), It.IsAny<string>()))
                .Returns((int id, string comment) =>
                {
                    return false;
                });

            var controller = new InvoicesController(invoiceRepositoryMock.Object, monthlyInvoiceSummaryRepositoryMock.Object);

            var model = new UpdateCommentByMonthAndYearModel
            {
                Month = 1,
                Year = "2024",
                Comment = "new comment"
            };

            // Act
            var result = controller.UpdateCommentByMonthAndYear(model);

            // Assert
            var statusCodeResult = Assert.IsType<ObjectResult>(result);
            Assert.Equal(500, statusCodeResult.StatusCode);
            Assert.Equal("Error occurred while executing UpdateCommentByMonthAndYear: Simulated error", statusCodeResult.Value);
        }
        #endregion

        #region UpdateInvoiceById
        [Fact]
        public void UpdateInvoiceById_ReturnsOk()
        {
            // Arrange
            var invoiceRepositoryMock = new Mock<IInvoiceRepository>();
            invoiceRepositoryMock.Setup(repo => repo.GetInvoiceById(It.IsAny<int>())).Returns((int id) =>
            {
                return new Invoice
                {
                    InvoiceId = 1,
                    MonthlyInvoiceSummaryId = 1,
                    CreateTimestamp = new DateTime(2024, 1, 2),
                    UpdateTimestamp = new DateTime(2024, 1, 3),
                    Store = null,
                    Total = 58
                };
            });

            invoiceRepositoryMock.Setup(repo => repo.UpdateInvoiceById(It.IsAny<Invoice>())).Returns(true);

            var monthlyInvoiceSummaryRepositoryMock = new Mock<IMonthlyInvoiceSummaryRepository>();
            var controller = new InvoicesController(invoiceRepositoryMock.Object, monthlyInvoiceSummaryRepositoryMock.Object);

            var model = new UpdateInvoiceByIdModel
            {
                Id = 1,
                InvoiceTotal = 89.54
            };

            // Act
            var result = controller.UpdateInvoiceById(model);

            // Assert
            Assert.IsType<OkResult>(result);
        }

        [Fact]
        public void UpdateInvoiceById_ReturnsNotFound_BecauseInvoiceIsNull()
        {
            // Arrange
            var invoiceRepositoryMock = new Mock<IInvoiceRepository>();
            invoiceRepositoryMock.Setup(repo => repo.GetInvoiceById(It.IsAny<int>())).Returns((int id) =>
            {
                return null;
            });

            var monthlyInvoiceSummaryRepositoryMock = new Mock<IMonthlyInvoiceSummaryRepository>();
            var controller = new InvoicesController(invoiceRepositoryMock.Object, monthlyInvoiceSummaryRepositoryMock.Object);

            var model = new UpdateInvoiceByIdModel
            {
                Id = 5,
                InvoiceTotal = 89.54
            };

            // Act
            var result = controller.UpdateInvoiceById(model);

            // Assert
            var statusCodeResult = Assert.IsType<NotFoundObjectResult>(result);
            Assert.Equal(404, statusCodeResult.StatusCode);
            Assert.Equal("No invoice found for id 5", statusCodeResult.Value);
        }

        [Fact]
        public void UpdateInvoiceById_ReturnsNotFound_BecauseInvoiceIsNotUpdated()
        {
            // Arrange
            var invoiceRepositoryMock = new Mock<IInvoiceRepository>();
            invoiceRepositoryMock.Setup(repo => repo.GetInvoiceById(It.IsAny<int>())).Returns((int id) =>
            {
                return new Invoice
                {
                    InvoiceId = 1,
                    MonthlyInvoiceSummaryId = 1,
                    CreateTimestamp = new DateTime(2024, 1, 2),
                    UpdateTimestamp = new DateTime(2024, 1, 3),
                    Store = null,
                    Total = 58
                };
            });
            invoiceRepositoryMock.Setup(repo => repo.UpdateInvoiceById(It.IsAny<Invoice>())).Returns(false);

            var monthlyInvoiceSummaryRepositoryMock = new Mock<IMonthlyInvoiceSummaryRepository>();
            var controller = new InvoicesController(invoiceRepositoryMock.Object, monthlyInvoiceSummaryRepositoryMock.Object);

            var model = new UpdateInvoiceByIdModel
            {
                Id = 5,
                InvoiceTotal = 89.54
            };

            // Act
            var result = controller.UpdateInvoiceById(model);

            // Assert
            var statusCodeResult = Assert.IsType<NotFoundObjectResult>(result);
            Assert.Equal(404, statusCodeResult.StatusCode);
            Assert.Equal("Invoice with id 5 not updated.", statusCodeResult.Value);
        }

        [Fact]
        public void UpdateInvoiceById_ReturnsInternalError()
        {
            // Arrange
            var invoiceRepositoryMock = new Mock<IInvoiceRepository>();
            invoiceRepositoryMock.Setup(repo => repo.GetInvoiceById(It.IsAny<int>())).Returns((int id) =>
            {
                return new Invoice
                {
                    InvoiceId = 1,
                    MonthlyInvoiceSummaryId = 1,
                    CreateTimestamp = new DateTime(2024, 1, 2),
                    UpdateTimestamp = new DateTime(2024, 1, 3),
                    Store = null,
                    Total = 58
                };
            });
            invoiceRepositoryMock.Setup(repo => repo.UpdateInvoiceById(It.IsAny<Invoice>()))
                .Throws(new Exception("Simulated error"));

            var monthlyInvoiceSummaryRepositoryMock = new Mock<IMonthlyInvoiceSummaryRepository>();
            var controller = new InvoicesController(invoiceRepositoryMock.Object, monthlyInvoiceSummaryRepositoryMock.Object);

            var model = new UpdateInvoiceByIdModel
            {
                Id = 5,
                InvoiceTotal = 89.54
            };

            // Act
            var result = controller.UpdateInvoiceById(model);

            // Assert
            var statusCodeResult = Assert.IsType<ObjectResult>(result);
            Assert.Equal(500, statusCodeResult.StatusCode);
            Assert.Equal("Error occurred while executing UpdateInvoiceById: Simulated error", statusCodeResult.Value);
        }
        #endregion

        #region AddInvoiceToMonthAndYear
        [Fact]
        public void AddInvoiceToMonthAndYear_ReturnsOk()
        {
            // Arrange
            var invoiceRepositoryMock = new Mock<IInvoiceRepository>();
            invoiceRepositoryMock.Setup(repo => repo.AddInvoiceToMonthAndYear(It.IsAny<Invoice>())).Returns(true);

            var monthlyInvoiceSummaryRepositoryMock = new Mock<IMonthlyInvoiceSummaryRepository>();
            monthlyInvoiceSummaryRepositoryMock.Setup(repo => repo.GetMonthlyInvoiceSummaryId(It.IsAny<int>(), It.IsAny<string>()))
                .Returns((int month, string year) =>
                {
                    return 1;
                });

            var controller = new InvoicesController(invoiceRepositoryMock.Object, monthlyInvoiceSummaryRepositoryMock.Object);

            var model = new AddInvoiceToMonthAndYearModel
            {
                InvoiceTotal = 3,
                Month = 4,
                Year = "2024"
            };

            // Act
            var result = controller.AddInvoiceToMonthAndYear(model);

            // Assert
            Assert.IsType<OkResult>(result);
        }

        [Fact]
        public void AddInvoiceToMonthAndYear_ReturnsNotFound_BecauseIdIsNull()
        {
            // Arrange
            var invoiceRepositoryMock = new Mock<IInvoiceRepository>();

            var monthlyInvoiceSummaryRepositoryMock = new Mock<IMonthlyInvoiceSummaryRepository>();
            monthlyInvoiceSummaryRepositoryMock.Setup(repo => repo.GetMonthlyInvoiceSummaryId(It.IsAny<int>(), It.IsAny<string>()))
                .Returns((int month, string year) =>
                {
                    return 0;
                });
            var controller = new InvoicesController(invoiceRepositoryMock.Object, monthlyInvoiceSummaryRepositoryMock.Object);

            var model = new AddInvoiceToMonthAndYearModel
            {
                InvoiceTotal = 3,
                Month = 4,
                Year = "2024"
            };

            // Act
            var result = controller.AddInvoiceToMonthAndYear(model);

            // Assert
            var statusCodeResult = Assert.IsType<NotFoundObjectResult>(result);
            Assert.Equal(404, statusCodeResult.StatusCode);
            Assert.Equal("No MonthlyInvoiceSummary found for month 4 and year 2024", statusCodeResult.Value);
        }

        [Fact]
        public void AddInvoiceToMonthAndYear_ReturnsNotFound_BecauseInvoiceIsNotAdded()
        {
            // Arrange
            var invoiceRepositoryMock = new Mock<IInvoiceRepository>();
            invoiceRepositoryMock.Setup(repo => repo.AddInvoiceToMonthAndYear(It.IsAny<Invoice>())).Returns(false);

            var monthlyInvoiceSummaryRepositoryMock = new Mock<IMonthlyInvoiceSummaryRepository>();
            monthlyInvoiceSummaryRepositoryMock.Setup(repo => repo.GetMonthlyInvoiceSummaryId(It.IsAny<int>(), It.IsAny<string>()))
                .Returns((int month, string year) =>
                {
                    return 1;
                });
            var controller = new InvoicesController(invoiceRepositoryMock.Object, monthlyInvoiceSummaryRepositoryMock.Object);

            var model = new AddInvoiceToMonthAndYearModel
            {
                InvoiceTotal = 3,
                Month = 4,
                Year = "2024"
            };

            // Act
            var result = controller.AddInvoiceToMonthAndYear(model);

            // Assert
            var statusCodeResult = Assert.IsType<NotFoundObjectResult>(result);
            Assert.Equal(404, statusCodeResult.StatusCode);
            Assert.Equal("Invoice with total 3 not added.", statusCodeResult.Value);
        }

        [Fact]
        public void AddInvoiceToMonthAndYear_ReturnsInternalError()
        {
            // Arrange
            var invoiceRepositoryMock = new Mock<IInvoiceRepository>();
            invoiceRepositoryMock.Setup(repo => repo.AddInvoiceToMonthAndYear(It.IsAny<Invoice>())).Throws(new Exception("Simulated error"));

            var monthlyInvoiceSummaryRepositoryMock = new Mock<IMonthlyInvoiceSummaryRepository>();
            monthlyInvoiceSummaryRepositoryMock.Setup(repo => repo.GetMonthlyInvoiceSummaryId(It.IsAny<int>(), It.IsAny<string>()))
                .Returns((int month, string year) =>
                {
                    return 1;
                });
            var controller = new InvoicesController(invoiceRepositoryMock.Object, monthlyInvoiceSummaryRepositoryMock.Object);

            var model = new AddInvoiceToMonthAndYearModel
            {
                InvoiceTotal = 3,
                Month = 4,
                Year = "2024"
            };

            // Act
            var result = controller.AddInvoiceToMonthAndYear(model);

            // Assert
            var statusCodeResult = Assert.IsType<ObjectResult>(result);
            Assert.Equal(500, statusCodeResult.StatusCode);
            Assert.Equal("Error occurred while executing AddInvoiceToMonthAndYear: Simulated error", statusCodeResult.Value);
        }
        #endregion

        #region GetCommentPerMonthAndYear
        [Fact]
        public void GetCommentPerMonthAndYear_ReturnsOk()
        {
            // Arrange
            var invoiceRepositoryMock = new Mock<IInvoiceRepository>();

            var monthlyInvoiceSummaryRepositoryMock = new Mock<IMonthlyInvoiceSummaryRepository>();
            monthlyInvoiceSummaryRepositoryMock.Setup(repo => repo.GetMonthlyInvoiceSummaryId(It.IsAny<int>(), It.IsAny<string>()))
                .Returns((int month, string year) =>
                {
                    return 1;
                });
            monthlyInvoiceSummaryRepositoryMock.Setup(repo => repo.GetCommentByMonthlyInvoiceSummaryId(It.IsAny<int>())).Returns("this is the comment");

            var controller = new InvoicesController(invoiceRepositoryMock.Object, monthlyInvoiceSummaryRepositoryMock.Object);

            var model = new GetDataPerMonthAndYearModel
            {
                Month = 4,
                Year = "2024"
            };

            // Act
            var result = controller.GetCommentPerMonthAndYear(model);

            // Assert
            var statusCodeResult = Assert.IsType<OkObjectResult>(result);
            Assert.Equal(200, statusCodeResult.StatusCode);
            Assert.Equal("this is the comment", statusCodeResult.Value);
        }

        [Fact]
        public void GetCommentPerMonthAndYear_ReturnsNotFound_BecauseIdIsNull()
        {
            // Arrange
            var invoiceRepositoryMock = new Mock<IInvoiceRepository>();

            var monthlyInvoiceSummaryRepositoryMock = new Mock<IMonthlyInvoiceSummaryRepository>();
            monthlyInvoiceSummaryRepositoryMock.Setup(repo => repo.GetMonthlyInvoiceSummaryId(It.IsAny<int>(), It.IsAny<string>()))
                .Returns((int month, string year) =>
                {
                    return 0;
                });

            var controller = new InvoicesController(invoiceRepositoryMock.Object, monthlyInvoiceSummaryRepositoryMock.Object);

            var model = new GetDataPerMonthAndYearModel
            {
                Month = 7,
                Year = "2023"
            };

            // Act
            var result = controller.GetCommentPerMonthAndYear(model);

            // Assert
            var statusCodeResult = Assert.IsType<NotFoundObjectResult>(result);
            Assert.Equal(404, statusCodeResult.StatusCode);
            Assert.Equal("No MonthlyInvoiceSummary found for month 7 and year 2023", statusCodeResult.Value);
        }

        [Fact]
        public void GetCommentPerMonthAndYear_ReturnsNotFound_BecauseCommentIsNull()
        {
            // Arrange
            var invoiceRepositoryMock = new Mock<IInvoiceRepository>();

            var monthlyInvoiceSummaryRepositoryMock = new Mock<IMonthlyInvoiceSummaryRepository>();
            monthlyInvoiceSummaryRepositoryMock.Setup(repo => repo.GetMonthlyInvoiceSummaryId(It.IsAny<int>(), It.IsAny<string>()))
                .Returns((int month, string year) =>
                {
                    return 1;
                });
            monthlyInvoiceSummaryRepositoryMock.Setup(repo => repo.GetCommentByMonthlyInvoiceSummaryId(It.IsAny<int>())).Returns((string)null);

            var controller = new InvoicesController(invoiceRepositoryMock.Object, monthlyInvoiceSummaryRepositoryMock.Object);

            var model = new GetDataPerMonthAndYearModel
            {
                Month = 7,
                Year = "2023"
            };

            // Act
            var result = controller.GetCommentPerMonthAndYear(model);

            // Assert
            var statusCodeResult = Assert.IsType<NotFoundObjectResult>(result);
            Assert.Equal(404, statusCodeResult.StatusCode);
            Assert.Equal("Comment for month 7 and year 2023 not found.", statusCodeResult.Value);
        }

        [Fact]
        public void GetCommentPerMonthAndYear_ReturnsInternalError()
        {
            // Arrange
            var invoiceRepositoryMock = new Mock<IInvoiceRepository>();

            var monthlyInvoiceSummaryRepositoryMock = new Mock<IMonthlyInvoiceSummaryRepository>();
            monthlyInvoiceSummaryRepositoryMock.Setup(repo => repo.GetMonthlyInvoiceSummaryId(It.IsAny<int>(), It.IsAny<string>()))
                .Returns((int month, string year) =>
                {
                    return 1;
                });
            monthlyInvoiceSummaryRepositoryMock.Setup(repo => repo.GetCommentByMonthlyInvoiceSummaryId(It.IsAny<int>())).Throws(new Exception("Simulated error"));

            var controller = new InvoicesController(invoiceRepositoryMock.Object, monthlyInvoiceSummaryRepositoryMock.Object);

            var model = new GetDataPerMonthAndYearModel
            {
                Month = 7,
                Year = "2023"
            };

            // Act
            var result = controller.GetCommentPerMonthAndYear(model);

            // Assert
            var statusCodeResult = Assert.IsType<ObjectResult>(result);
            Assert.Equal(500, statusCodeResult.StatusCode);
            Assert.Equal("Error occurred while executing GetCommentPerMonthAndYear: Simulated error", statusCodeResult.Value);
        }
        #endregion

        #region GetInvoicesPerMonthAndYear
        [Fact]
        public void GetInvoicesPerMonthAndYear_ReturnsOk_WithEmptyList()
        {
            // Arrange
            var invoiceRepositoryMock = new Mock<IInvoiceRepository>();
            invoiceRepositoryMock.Setup(repo => repo.GetInvoicesPerMonthlyInvoiceSummaryId(It.IsAny<int>()))
                .Returns((int id) =>
                {
                    return new List<Invoice>();
                });

            var monthlyInvoiceSummaryRepositoryMock = new Mock<IMonthlyInvoiceSummaryRepository>();
            monthlyInvoiceSummaryRepositoryMock.Setup(repo => repo.GetMonthlyInvoiceSummaryId(It.IsAny<int>(), It.IsAny<string>()))
                .Returns((int month, string year) =>
                {
                    return 1;
                });

            var controller = new InvoicesController(invoiceRepositoryMock.Object, monthlyInvoiceSummaryRepositoryMock.Object);

            var model = new GetDataPerMonthAndYearModel
            {
                Month = 4,
                Year = "2024"
            };

            // Act
            var result = controller.GetInvoicesPerMonthAndYear(model);

            // Assert
            var statusCodeResult = Assert.IsType<OkObjectResult>(result);
            Assert.Equal(200, statusCodeResult.StatusCode);
            Assert.Equal(new List<Invoice>(), statusCodeResult.Value);
            var returnedInvoices = Assert.IsType<List<Invoice>>(statusCodeResult.Value);
            Assert.Empty(returnedInvoices);
        }

        [Fact]
        public void GetInvoicesPerMonthAndYear_ReturnsOk_WithFilledList()
        {
            // Arrange
            List<Invoice> invoices = new List<Invoice>()
            {
                new Invoice {
                    InvoiceId = 1,
                    MonthlyInvoiceSummaryId = 2,
                    CreateTimestamp= new DateTime(2024,1,2),
                    UpdateTimestamp = new DateTime(2024,1,3),
                    Store = null,
                    Total= 34.56
                },
                new Invoice {
                    InvoiceId = 2,
                    MonthlyInvoiceSummaryId = 2,
                    CreateTimestamp= new DateTime(2024,1,7),
                    UpdateTimestamp = new DateTime(2024,1,8),
                    Store = null,
                    Total= 673.67
                }
            };

            var invoiceRepositoryMock = new Mock<IInvoiceRepository>();
            invoiceRepositoryMock.Setup(repo => repo.GetInvoicesPerMonthlyInvoiceSummaryId(It.IsAny<int>()))
                .Returns((int id) =>
                {
                    return invoices;
                });

            var monthlyInvoiceSummaryRepositoryMock = new Mock<IMonthlyInvoiceSummaryRepository>();
            monthlyInvoiceSummaryRepositoryMock.Setup(repo => repo.GetMonthlyInvoiceSummaryId(It.IsAny<int>(), It.IsAny<string>()))
                .Returns((int month, string year) =>
                {
                    return 1;
                });

            var controller = new InvoicesController(invoiceRepositoryMock.Object, monthlyInvoiceSummaryRepositoryMock.Object);

            var model = new GetDataPerMonthAndYearModel
            {
                Month = 4,
                Year = "2024"
            };

            // Act
            var result = controller.GetInvoicesPerMonthAndYear(model);

            // Assert
            var statusCodeResult = Assert.IsType<OkObjectResult>(result);
            Assert.Equal(200, statusCodeResult.StatusCode);
            Assert.Equal(invoices, statusCodeResult.Value);
            var returnedInvoices = Assert.IsType<List<Invoice>>(statusCodeResult.Value);
            Assert.Equal(returnedInvoices, invoices);
        }

        [Fact]
        public void GetInvoicesPerMonthAndYear_ReturnsNotFound_BecauseIdIsNull()
        {
            // Arrange
            var invoiceRepositoryMock = new Mock<IInvoiceRepository>();

            var monthlyInvoiceSummaryRepositoryMock = new Mock<IMonthlyInvoiceSummaryRepository>();
            monthlyInvoiceSummaryRepositoryMock.Setup(repo => repo.GetMonthlyInvoiceSummaryId(It.IsAny<int>(), It.IsAny<string>()))
                .Returns((int month, string year) =>
                {
                    return 0;
                });

            var controller = new InvoicesController(invoiceRepositoryMock.Object, monthlyInvoiceSummaryRepositoryMock.Object);

            var model = new GetDataPerMonthAndYearModel
            {
                Month = 7,
                Year = "2023"
            };

            // Act
            var result = controller.GetInvoicesPerMonthAndYear(model);

            // Assert
            var statusCodeResult = Assert.IsType<NotFoundObjectResult>(result);
            Assert.Equal(404, statusCodeResult.StatusCode);
            Assert.Equal("No MonthlyInvoiceSummary found for month 7 and year 2023", statusCodeResult.Value);
        }

        [Fact]
        public void GetInvoicesPerMonthAndYear_ReturnsInternalError()
        {
            // Arrange
            var invoiceRepositoryMock = new Mock<IInvoiceRepository>();
            invoiceRepositoryMock.Setup(repo => repo.GetInvoicesPerMonthlyInvoiceSummaryId(It.IsAny<int>())).Throws(new Exception("Simulated error"));

            var monthlyInvoiceSummaryRepositoryMock = new Mock<IMonthlyInvoiceSummaryRepository>();
            monthlyInvoiceSummaryRepositoryMock.Setup(repo => repo.GetMonthlyInvoiceSummaryId(It.IsAny<int>(), It.IsAny<string>()))
                .Returns((int month, string year) =>
                {
                    return 1;
                });

            var controller = new InvoicesController(invoiceRepositoryMock.Object, monthlyInvoiceSummaryRepositoryMock.Object);

            var model = new GetDataPerMonthAndYearModel
            {
                Month = 7,
                Year = "2023"
            };

            // Act
            var result = controller.GetInvoicesPerMonthAndYear(model);

            // Assert
            var statusCodeResult = Assert.IsType<ObjectResult>(result);
            Assert.Equal(500, statusCodeResult.StatusCode);
            Assert.Equal("Error occurred while executing GetInvoicesPerMonthAndYear: Simulated error", statusCodeResult.Value);
        }
        #endregion

        #region GetMonthTotalsForYear
        [Fact]
        public void GetMonthTotalsForYear_ReturnsInternalError()
        {
            // Arrange
            List<Invoice> invoices = new List<Invoice>()
            {
                new Invoice {
                    InvoiceId = 1,
                    MonthlyInvoiceSummaryId = 2,
                    CreateTimestamp= new DateTime(2024,1,2),
                    UpdateTimestamp = new DateTime(2024,1,3),
                    Store = null,
                    Total= 34.56
                },
                new Invoice {
                    InvoiceId = 2,
                    MonthlyInvoiceSummaryId = 2,
                    CreateTimestamp= new DateTime(2024,1,7),
                    UpdateTimestamp = new DateTime(2024,1,8),
                    Store = null,
                    Total= 673.67
                }
            };
            List<double> expectedResult = [708.23, 708.23, 708.23, 708.23, 708.23, 708.23, 708.23, 708.23, 708.23, 708.23, 708.23, 708.23];

            var invoiceRepositoryMock = new Mock<IInvoiceRepository>();
            invoiceRepositoryMock.Setup(repo => repo.GetInvoicesPerMonthlyInvoiceSummaryId(It.IsAny<int>())).Throws(new Exception("Simulated error"));

            var monthlyInvoiceSummaryRepositoryMock = new Mock<IMonthlyInvoiceSummaryRepository>();
            monthlyInvoiceSummaryRepositoryMock.Setup(repo => repo.GetMonthlyInvoiceSummaryId(It.IsAny<int>(), It.IsAny<string>()))
                .Returns((int month, string year) =>
                {
                    return 1;
                });


            var controller = new InvoicesController(invoiceRepositoryMock.Object, monthlyInvoiceSummaryRepositoryMock.Object);

            var year = "2023";

            // Act
            var result = controller.GetMonthTotalsForYear(year);

            // Assert
            var statusCodeResult = Assert.IsType<ObjectResult>(result);
            Assert.Equal(500, statusCodeResult.StatusCode);
            Assert.Equal("Error occurred while executing GetMonthTotalsForYear: Simulated error", statusCodeResult.Value);
        }

        [Fact]
        public void GetMonthTotalsForYear_ReturnsOk()
        {
            // Arrange
            List<Invoice> invoices = new List<Invoice>()
            {
                new Invoice {
                    InvoiceId = 1,
                    MonthlyInvoiceSummaryId = 2,
                    CreateTimestamp= new DateTime(2024,1,2),
                    UpdateTimestamp = new DateTime(2024,1,3),
                    Store = null,
                    Total= 34.561
                },
                new Invoice {
                    InvoiceId = 2,
                    MonthlyInvoiceSummaryId = 2,
                    CreateTimestamp= new DateTime(2024,1,7),
                    UpdateTimestamp = new DateTime(2024,1,8),
                    Store = null,
                    Total= 673.671
                }
            };
            List<double> expectedResult = [708.23, 708.23, 708.23, 708.23, 708.23, 708.23, 708.23, 708.23, 708.23, 708.23, 708.23, 708.23];

            var invoiceRepositoryMock = new Mock<IInvoiceRepository>();
            invoiceRepositoryMock.Setup(repo => repo.GetInvoicesPerMonthlyInvoiceSummaryId(It.IsAny<int>())).Returns((int id) =>
            {
                return invoices;
            });

            var monthlyInvoiceSummaryRepositoryMock = new Mock<IMonthlyInvoiceSummaryRepository>();
            monthlyInvoiceSummaryRepositoryMock.Setup(repo => repo.GetMonthlyInvoiceSummaryId(It.IsAny<int>(), It.IsAny<string>()))
                .Returns((int month, string year) =>
                {
                    return 1;
                });


            var controller = new InvoicesController(invoiceRepositoryMock.Object, monthlyInvoiceSummaryRepositoryMock.Object);

            var year = "2023";

            // Act
            var result = controller.GetMonthTotalsForYear(year);

            // Assert
            var statusCodeResult = Assert.IsType<OkObjectResult>(result);
            Assert.Equal(200, statusCodeResult.StatusCode);
            Assert.Equal(expectedResult, statusCodeResult.Value);
        }

        [Fact]
        public void GetMonthTotalsForYear_CurrentMonthIsZero_WhenCurrentYear()
        {
            // Arrange
            var now = DateTime.Now;
            var currentMonthIndex = now.Month - 1;

            var invoices = new List<Invoice>
            {
                new Invoice { Total = 100 },
                new Invoice { Total = 200 }
            };

            var invoiceRepositoryMock = new Mock<IInvoiceRepository>();
            invoiceRepositoryMock
                .Setup(r => r.GetInvoicesPerMonthlyInvoiceSummaryId(It.IsAny<int>()))
                .Returns(invoices);

            var monthlyRepoMock = new Mock<IMonthlyInvoiceSummaryRepository>();
            monthlyRepoMock
                .Setup(r => r.GetMonthlyInvoiceSummaryId(It.IsAny<int>(), It.IsAny<string>()))
                .Returns(1);

            var controller = new InvoicesController(
                invoiceRepositoryMock.Object,
                monthlyRepoMock.Object
            );

            // Act
            var result = controller.GetMonthTotalsForYear(now.Year.ToString());

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var totals = Assert.IsType<double[]>(okResult.Value);

            Assert.Equal(12, totals.Length);
            Assert.Equal(0, totals[currentMonthIndex]);
        }
        #endregion
    }
}