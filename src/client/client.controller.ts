import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  // Registrar un nuevo cliente
  @Post()
  async createClient(@Body() createClientDto: CreateClientDto) {
      return await this.clientService.create(createClientDto);
  }


  // Se obtiene un listado de clientes con la opción de filtro por el correo electrónico
  @Get()
  async getClients(@Query('email') email: string) {
      return await this.clientService.findAll(email);
  }

  // Actualizacion de un cliente
  @Put(':id')
  async updateClient(
      @Param('id') id: string,
      @Body() updateClientDto: UpdateClientDto
  ) {
      return await this.clientService.update(id, updateClientDto);
  }

  // Eliminacion de un cliente
  @Delete(':id')
  async deleteClient(@Param('id') id: string) {
      return await this.clientService.delete(id);
  }
}
