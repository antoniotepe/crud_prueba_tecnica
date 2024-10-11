import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId, Repository } from 'typeorm';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
  ) {}

  // Registrar un nuevo cliente
  async create(createClientDto: CreateClientDto): Promise<Client> {
    const { nombre, email, numeroTelefonico, password } = createClientDto;

    // Verificar si ya existe un cliente con el mismo correo electrónico en los registros
    const existingClient = await this.clientRepository.findOne({ where: { email } });
    if (existingClient) {
      throw new Error('Email already in use');
    }

    // Encriptar la contraseña antes de guardar el cliente en la base de datos
    const hashedPassword = await bcrypt.hash(password, 10);

    const client = this.clientRepository.create({
      nombre,
      email,
      numeroTelefonico,
      password: hashedPassword,
    });

    return await this.clientRepository.save(client);
  }

  // Obtener los clientes, con opción de filtrar por correo electrónico
  async findAll(email?: string): Promise<Client[]> {
    if (email) {
      return await this.clientRepository.find({ where: { email } });
    }
    return await this.clientRepository.find();
  }

  // Actualizar un cliente existente
  async update(id: string, updateClientDto: UpdateClientDto): Promise<Client> {
    // Convertir el id string a ObjectID para MongoDB
    const client = await this.clientRepository.findOne({
      where: { id: new ObjectId(id) },
    });

    if (!client) {
      throw new NotFoundException(`Client with ID ${id} not found`);
    }

    if (updateClientDto.password) {
      updateClientDto.password = await bcrypt.hash(updateClientDto.password, 10);
    }

    Object.assign(client, updateClientDto);
    return await this.clientRepository.save(client);
  }

  // Eliminar un cliente existente
  async delete(id: string): Promise<void> {
    // Convertir el id string a ObjectID para MongoDB
    const result = await this.clientRepository.delete(new ObjectId(id));

    if (result.affected === 0) {
      throw new NotFoundException(`Client with ID ${id} not found`);
    }
  }
}
