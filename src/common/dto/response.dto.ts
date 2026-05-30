import { ApiProperty } from "@nestjs/swagger";

export class ResponseDto<T> {
  @ApiProperty({ description: "Response data" })
  readonly data: T;

  @ApiProperty({
    example: "Operation completed successfully.",
    description: "Message describing the result",
  })
  readonly message: string;

  constructor(data: T, message: string = "Operation completed successfully.") {
    this.data = data;
    this.message = message;
  }
}

class PaginationDto {
  @ApiProperty({ example: 1, description: "Current page number" })
  readonly page: number;

  @ApiProperty({ example: 10, description: "Number of items per page" })
  readonly limit: number;

  @ApiProperty({ example: 100, description: "Total number of items" })
  readonly totalItems: number;

  @ApiProperty({ example: 10, description: "Total number of pages" })
  readonly totalPages: number;

  constructor(page: number, limit: number, totalItems: number) {
    this.page = page;
    this.limit = limit;
    this.totalItems = totalItems;
    this.totalPages = limit !== 0 ? Math.ceil(totalItems / limit) : 0;
  }
}

export class PaginationResponseDto<T> extends ResponseDto<T[]> {
  @ApiProperty({ description: "Pagination details", type: PaginationDto })
  readonly pagination: PaginationDto;

  constructor(
    data: T[],
    page: number,
    limit: number,
    totalItems: number,
    message: string = "Operation completed successfully.",
  ) {
    super(data, message);
    this.pagination = new PaginationDto(page, limit, totalItems);
  }
}

export class CursorPaginationResponseDto<T> extends ResponseDto<T[]> {
  @ApiProperty({ description: "Cursor for fetching the next set of results", example: "2026-02-01T09:20:00Z" })
  readonly nextCursor: string | number | null;

  constructor(data: T[], nextCursor: string | number | null, message: string = "Operation completed successfully.") {
    super(data, message);
    this.nextCursor = nextCursor;
  }
}
